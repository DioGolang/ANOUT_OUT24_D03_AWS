import { BadRequestException } from '@nestjs/common';

export class InvalidCarException extends BadRequestException {
  constructor(message: string) {
    super(message, 'InvalidCarException');
  }
}
