import { Logger } from '@nestjs/common'
import * as log4js from 'log4js'
const logger = log4js.getLogger('trace')
const errorLogger = log4js.getLogger('error')
const sqlLogger = log4js.getLogger('trace-sql')

export class LoggerService extends Logger {
    /* LO4JS */
    trace(message: any) {
        console.log(message)
        logger.trace(message)
    }
    fatal(message: any) {
        console.error(message)
        errorLogger.trace(message)
    }

    sql(message: any) {
        sqlLogger.trace(message)
    }
    sqlError(message: any) {
        sqlLogger.error(message)
    }


    /* NestJS */
    log(message: string) { super.log(message) }
    error(message: string, trace: string) { super.error(message, trace) }
    warn(message: string) { super.warn(message) }
    debug(message: string) { super.debug(message) }
    verbose(message: string) { super.verbose(message) }
}
