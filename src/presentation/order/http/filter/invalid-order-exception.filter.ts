import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { InvalidOrderException } from '../../../../domain/exceptions/invalid-order.exception';
import { Response } from 'express';

@Catch(InvalidOrderException)
export class InvalidOrderExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidOrderException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Invalid Client Data',
    });
  }
}
