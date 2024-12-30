import { ConflictException } from '@nestjs/common';

export class UserIfItAlreadyExistsException extends ConflictException {
  constructor() {
    super('User already exists', 'UserIfItAlreadyExistsException');
  }
}
