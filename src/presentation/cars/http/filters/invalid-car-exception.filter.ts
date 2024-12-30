import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { InvalidCarException } from '../../../../domain/exceptions/invalid-car.exception';
import { Response } from 'express';

@Catch(InvalidCarException)
export class InvalidCarExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidCarException, host: ArgumentsHost) {
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
