import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../interfaces/repositories/userRepository.interface';
import { InvalidUserException } from '../../exceptions/invalid-user.exception';
import { UserIfItAlreadyExistsException } from '../../exceptions/user-if-it-already-exists.exception';

@Injectable()
export class UserDomainService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async userExists(email: string): Promise<void> {
    const userExists = await this.userRepository.userExists(email);
    if (userExists) {
      throw new UserIfItAlreadyExistsException();
    }
  }
}
