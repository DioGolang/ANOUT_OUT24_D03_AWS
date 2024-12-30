import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/interfaces/repositories/userRepository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDomainService } from '../../../domain/services/user/user-domain.service';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly userDomainService: UserDomainService,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    await this.userDomainService.userExists(createUserDto.email);
    const userSchema = await this.userMapper.dtoToSchema(createUserDto);
    const dtoResponse = await this.userRepository.create(userSchema);
    const user = await this.userMapper.DtoToDomain(createUserDto);
    return this.userMapper.schemaToDto(dtoResponse);
  }
}
