import { UnprocessableEntityException } from '@nestjs/common';

export class InvalidEmailException extends UnprocessableEntityException {
  constructor() {
    super('Invalid email format');
  }
}
