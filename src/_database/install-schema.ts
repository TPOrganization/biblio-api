import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { asyncForEach, fetchFiles, getDBObject, getDbProtectedStr, getProtectedDbData } from 'src/_helper/tools'
import { LoggerService } from 'src/_helper/logger/logger.service'
import { join } from 'path'
import * as fs from 'fs'

@Injectable()
export class InstallSchema {
    constructor(
        private configService: ConfigService,
        private loggerService: LoggerService
    ) { }

    async processInstallSchema() {
        const setupTable = this.configService.get<string>('DB_SETUP_TABLE')
        const dbName = this.configService.get<string>('DB_DATABASE')
        const dbType = this.configService.get<string>('DB_TYPE')
        const dBObject = getDBObject(dbType)
        const dbProtectedName = getDbProtectedStr(dbType)
        const dbProtecteTableName = getDbProtectedStr(dbName)
        const { rows } = await dBObject.execute(`
            select table_name 
            from information_schema.tables 
            where table_schema=${dbProtectedName} 
            and table_name=${dbProtecteTableName}
        `, [dbName, setupTable])
        return new Promise(async (resolve, reject) => {
            if (rows.length > 0) {
                this.loggerService.trace('> Install already done => stop')
                resolve(true)
                return
            }
            const requests: Array<{ sql: string, params?: Array<string> }> = []
            let setupTableSql = ''
            switch (dbType) {
                case 'postgres':
                    setupTableSql = `
                        CREATE TABLE "${setupTable}" (
                            id SERIAL PRIMARY KEY,
                            key varchar(50),
                            version varchar(50)
                        )
                    `
                    break
                default: // mysql
                    setupTableSql = `
                        CREATE TABLE ${setupTable} (
                            id int NOT NULL AUTO_INCREMENT,
                            \`key\` varchar(50),
                            \`version\` varchar(50),
                            PRIMARY KEY (id)
                        )
                    `
                    break
            }
            requests.push({ sql: setupTableSql })

            const initFiles = await fetchFiles(join(__dirname, '../..', this.configService.get<string>('NODE_ENV') === 'production' ? 'dist/_database/_install' : 'src/_database/_install'))
            initFiles.forEach((initFile: string) => {
                const sqlFileContent = fs.readFileSync(initFile).toString()
                    .replace(/(\r\n|\n|\r)/gm, ' ')
                    .replace(/\s+/g, ' ')
                    .split(';')
                    .map(Function.prototype.call, String.prototype.trim)
                    .filter((e) => e.length)
                sqlFileContent.map(e => requests.push({ sql: e }))
            })

            try {
                let error = false
                await asyncForEach([...requests], async (query, i) => {
                    const result = await dBObject.execute(query.sql, query.params)
                    if (result === null) {
                        error = true
                        this.loggerService.trace(`> Install schema : query error : ${initFiles[i - 1]}`)
                    }
                })

                if (error) {
                    this.loggerService.trace('> Install query executed with error, check log and retry')
                    reject(false)
                    return
                }

                this.loggerService.trace('> Install all query executed with success')
                const insertParamSQL = dbProtectedName === '?' ? '(?,?), (?,?)' : '($1,$2), ($3,$4)'
                await dBObject.execute(`
                    INSERT INTO ${getProtectedDbData(dbType, setupTable)} (${getProtectedDbData(dbType, 'key')}, ${getProtectedDbData(dbType, 'version')})
                    VALUES ${insertParamSQL}`,
                ['schema_version', '0.0.1', 'data_version', '0.0.1']
                )
                this.loggerService.trace('> Install schema complete')

                resolve(true)
            } catch (e) {
                this.loggerService.fatal(e.message)
                reject(e)
            }
        })
    }
}