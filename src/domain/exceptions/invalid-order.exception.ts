import { BadRequestException } from '@nestjs/common';

export class InvalidOrderException extends BadRequestException {
  constructor(message: string) {
    super(message, 'InvalidOrderException');
  }
}
