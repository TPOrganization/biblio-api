import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    LoggerService,
} from '@nestjs/common'
import { Observable, catchError } from 'rxjs'
export interface Response<T> {
    data: T;
}

@Injectable()
export class ErrorInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private loggerService: LoggerService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const now = Date.now()
        return next.handle()
            .pipe(catchError(error => {
                this.loggerService.error(
                    `${context.getArgByIndex(0).method} ${context.getArgByIndex(0).url
                    } - ${error.stack} - ${Date.now() - now}ms`,
                )
                throw error
            }))
    }
  
}
