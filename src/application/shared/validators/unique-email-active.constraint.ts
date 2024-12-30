import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/interfaces/repositories/userRepository.interface';

@ValidatorConstraint({ name: 'uniqueEmailActive', async: true })
export class UniqueEmailActiveConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async validate(email: string): Promise<boolean> {
    const userExists = await this.userRepository.userExists(email);
    return !userExists;
  }
}
