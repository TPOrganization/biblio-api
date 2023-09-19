import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ErrorInterceptor } from './_helper/logger/error.interceptor'
import { LoggerInterceptor } from './_helper/logger/logger.interceptor'
import { LoggerService } from './_helper/logger/logger.service'
import { InstallSchema } from './_database/install-schema'
import { UpgradeSchema } from './_database/upgrade-schema'
import { join } from 'path'
import { json } from 'express'
import { config } from 'dotenv'
import * as fs from 'fs'
import * as log4js from 'log4js'
import { asyncForEach, getDBObject } from './_helper/tools'
/* eslint-disable */
process.send = process.send || function (): any { }

log4js.configure({
    appenders: {
        everything: {
            type: 'multiFile',
            base: 'logs/',
            property: 'categoryName',
            extension: '.log',
            maxLogSize: 10485760,
            backups: 3,
            compress: true,
        },
    },
    categories: {
        default: {
            appenders: ['everything'],
            level: 'trace',
        },
    },
})

try {
    if (fs.existsSync('/custom_secrets_path/.env')) {
        config({ path: '/custom_secrets_path/.env' })
    } else {
        config()
    }
} catch (err) {
    console.error(err)
}

const { PORT, FORCE_INSTALL_SCHEMA, DB_TYPE } = process.env
async function bootstrap() {
    const dBObject = getDBObject(DB_TYPE)
    if (FORCE_INSTALL_SCHEMA === 'true') {
        const initFile = join(__dirname, '..', 'src/_database/_drop/drop-table.sql')
        const sqlFileContents = fs.readFileSync(initFile).toString()
            .replace(/(\r\n|\n|\r)/gm, ' ')
            .replace(/\s+/g, ' ')
            .split(';')
            .map(Function.prototype.call, String.prototype.trim)
            .filter((e) => e.length)
        await asyncForEach(sqlFileContents, async sqlFileContent => {
            await dBObject.execute(sqlFileContent)
        })
    }

    const app = await NestFactory.create(AppModule)
    const logger = app.get(LoggerService)
    logger.trace('Server start ...')

    app.setGlobalPrefix('api')
    app.enableCors({ credentials: true, origin: true })
    app.useGlobalInterceptors(
        new ErrorInterceptor(logger),
        new LoggerInterceptor(logger),
    )
    app.use(json({ limit: '10mb' }))

    logger.trace('> Install schema is running...')
    const installSchema = app.get(InstallSchema)
    await installSchema.processInstallSchema()
    logger.trace('> Upgrade schema is running...')
    const upgradeSchema = app.get(UpgradeSchema)
    await upgradeSchema.processUpgradeSchema()

    await app.listen(PORT)
    logger.trace(`> Ready on http://localhost:${PORT}`)

    process
        .on('unhandledRejection', (reason) => {
            logger.fatal('Unhandled Rejection at Promise')
            logger.fatal(reason)
        })
        .on('uncaughtException', (err) => {
            logger.fatal('Uncaught Exception thrown')
            logger.fatal(err)
        })
}
bootstrap()
