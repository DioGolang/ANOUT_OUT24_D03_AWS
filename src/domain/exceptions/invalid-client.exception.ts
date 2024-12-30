import { BadRequestException } from '@nestjs/common';

export class InvalidClientException extends BadRequestException {
  constructor(message: string) {
    super(message, 'InvalidClientException');
  }
}
