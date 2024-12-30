import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../domain/interfaces/repositories/userRepository.interface';
import { UserMapper } from '../mapper/user.mapper';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';

@Injectable()
export class EnableUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string): Promise<CreateUserResponseDto> {
    const exists = await this.userRepository.findId(id);
    if (!exists) {
      throw new NotFoundException('User not found');
    }
    const userSchema = await this.userRepository.enable(id);
    return await this.userMapper.schemaToDto(userSchema);
  }
}
