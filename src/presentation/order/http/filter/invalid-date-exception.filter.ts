import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { InvalidDateException } from '../../../../domain/exceptions/invalid-date.exception';
import { Response } from 'express';

@Catch(InvalidDateException)
export class InvalidDateExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidDateException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Invalid  Date',
    });
  }
}
