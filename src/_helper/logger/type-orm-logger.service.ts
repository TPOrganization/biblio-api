import { Logger, QueryRunner } from 'typeorm'
import * as log4js from 'log4js'
const sqlLogger = log4js.getLogger('trace-sql')

export class TypeOrmLoggerService implements Logger {
    /* eslint-disable */
    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) { }
    /* eslint-disable */
    logMigration(message: string, queryRunner?: QueryRunner) { }
    /* eslint-disable */
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        sqlLogger.trace(`${query} | Params : ${JSON.stringify(parameters)}`)
    }
    /* eslint-disable */
    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        sqlLogger.error(`Error on executed query : ${JSON.stringify(error)} | Params : ${JSON.stringify(parameters)}`)
    }
    /* eslint-disable */
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) { }
    /* eslint-disable */
    logSchemaBuild(message: string, queryRunner?: QueryRunner) { }
}
