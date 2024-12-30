import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../domain/interfaces/repositories/userRepository.interface';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findId(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userMapper.schemaToDto(user);
  }
}
