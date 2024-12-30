import { NotFoundException } from '@nestjs/common';

export class NotFoundOrderException extends NotFoundException {
  constructor() {
    super('Order Not Found');
  }
}
