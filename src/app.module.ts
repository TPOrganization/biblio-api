import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggerModule } from './_helper/logger/logger.module'
import { HealthModule } from './_controller/health/health.module'
import { MediaModule } from './_controller/media/media.module'
import { InstallSchema } from './_database/install-schema'
import { UpgradeSchema } from './_database/upgrade-schema'
import { MailModule } from './_helper/mail/mail.module'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { DataBaseConfiguration } from './_config/database.configuration'
import { ModelService } from './_controller/_database/_model.service'
import { ModelController } from './_controller/_database/_model.controller'
import { UserModule } from './_controller/_database/user/user.module'
import { UserController } from './_controller/_database/user/user.controller'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HttpModule,
        LoggerModule,
        MailModule,
        ScheduleModule.forRoot(),
        HealthModule,
        MediaModule,
        TypeOrmModule.forRootAsync({
            useClass: DataBaseConfiguration
        }),
        UserModule
    ],
    controllers: [
        AppController,
        UserController
    ],
    providers: [
        AppService,
        InstallSchema,
        UpgradeSchema
    ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {

    }
}
