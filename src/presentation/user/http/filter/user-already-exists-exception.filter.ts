import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { UserIfItAlreadyExistsException } from '../../../../domain/exceptions/user-if-it-already-exists.exception';
import { Response } from 'express';

@Catch(UserIfItAlreadyExistsException)
export class UserAlreadyExistsExceptionFilter implements ExceptionFilter {
  catch(exception: UserIfItAlreadyExistsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Conflict User',
    });
  }
}
