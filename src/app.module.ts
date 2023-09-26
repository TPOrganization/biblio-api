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
import { DataSource } from 'typeorm'
import { Utilisateur } from './_controller/_database/_entity/utilisateur/utilisateur.entity'
import { Book } from './_controller/_database/_entity/book/book.entity'
import { BookType } from './_controller/_database/_entity/bookType/bookType.entity'
import { Type } from './_controller/_database/_entity/type/type.entity'
import { Status } from './_controller/_database/_entity/status/status.entity'
import { Author } from './_controller/_database/_entity/author/author.entity'
import { UtilisateurModule } from './_controller/_database/utilisateur/utilisateur.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HttpModule,
        LoggerModule,
        MailModule,
        ScheduleModule.forRoot(),
        HealthModule,
        MediaModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [Utilisateur, Book, BookType, Type, Status, Author], // book, book_type, type, author, status
            synchronize: true,
        }),
        UtilisateurModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        InstallSchema,
        UpgradeSchema
    ],
})
export class AppModule { 
    constructor (private dataSource: DataSource){

    }
}
