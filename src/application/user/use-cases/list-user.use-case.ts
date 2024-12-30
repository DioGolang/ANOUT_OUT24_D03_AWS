import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/interfaces/repositories/userRepository.interface';
import { UserMapper } from '../mapper/user.mapper';
import { ListUserDto } from '../dto/list-user.dto';

@Injectable()
export class ListUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(filter: ListUserDto): Promise<ListUserDto[]> {
    const users = await this.userRepository.list(filter);
    return await this.userMapper.toDomainList(users);
  }
}
