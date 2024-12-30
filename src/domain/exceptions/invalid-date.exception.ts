import { UnprocessableEntityException } from '@nestjs/common';

export class InvalidDateException extends UnprocessableEntityException {
  constructor() {
    super('Incorrect start date and end date');
  }
}
