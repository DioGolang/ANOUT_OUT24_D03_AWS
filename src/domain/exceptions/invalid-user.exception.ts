import { BadRequestException } from '@nestjs/common';

export class InvalidUserException extends BadRequestException {
  constructor(message: string) {
    super(message, 'InvalidUserException');
  }
}
