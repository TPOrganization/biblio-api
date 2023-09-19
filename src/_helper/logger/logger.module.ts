import { Module } from '@nestjs/common'
import { LoggerService } from './logger.service'
import { TypeOrmLoggerService } from './type-orm-logger.service'

@Module({
    providers: [
        LoggerService,
        TypeOrmLoggerService
    ],
    exports: [
        LoggerService,
        TypeOrmLoggerService
    ],
})
export class LoggerModule { }
