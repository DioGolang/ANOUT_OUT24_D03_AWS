import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { NotFoundCarException } from '../../../../domain/exceptions/not-found-car';

@Catch(NotFoundCarException)
export class NotFoundCarExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundCarException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Car Nor Found',
    });
  }
}
