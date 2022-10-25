import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    response.locals.user = 'Sergio';

    return next.handle().pipe(map((data) => ({ traceId: uuidv4(), data })));
  }
}
