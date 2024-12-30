import { NotFoundException } from '@nestjs/common';

export class NotFoundClientException extends NotFoundException {
  constructor() {
    super('Client Not Found');
  }
}
