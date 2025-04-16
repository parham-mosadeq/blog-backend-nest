import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CustomError } from '../interfaces';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Record<string, unknown>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Record<string, unknown>> {
    return next.handle().pipe(
      map((data: Record<string, unknown> | Record<string, unknown>[]) => ({
        status: 'success',
        message: 'Request successful',
        data,
      })),
      catchError((err: CustomError) => {
        console.log(err, 'err');
        return throwError(
          () =>
            new HttpException(
              {
                status: 'error',
                message: err.message || 'Something went wrong',
                statusCode: err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                data: [],
              },
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}
