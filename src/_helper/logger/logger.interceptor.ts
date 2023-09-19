import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    LoggerService,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'



@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(private loggerService: LoggerService) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()
        return next.handle().pipe(
            tap(() => {
                this.loggerService.log(
                    `${context.getArgByIndex(0).method} ${context.getArgByIndex(0).url
                    } - ${Date.now() - now}ms`,
                )
            }),
        )
    }
}
