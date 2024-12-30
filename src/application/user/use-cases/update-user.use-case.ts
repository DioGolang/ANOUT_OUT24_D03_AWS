import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../../domain/interfaces/repositories/userRepository.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserMapper } from '../mapper/user.mapper';
import { Password } from '../../../domain/value-objects/password.vo';
import { Crypt } from '../../../domain/interfaces/crypt/crypt.interface';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
    @Inject('Crypt')
    private readonly crypt: Crypt,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    const user = await this.userRepository.userExists(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email) {
      const userExists = await this.userRepository.userExists(dto.email);
      if (userExists) {
        throw new ConflictException('Email already exists');
      }
    }

    if (dto.password) {
      Password.setHasher(this.crypt);
      const hashedPassword = await Password.create(dto.password);
      dto.password = hashedPassword.toString();
    }
    const userSchemaUpdate = await this.userRepository.update(id, dto);
    return await this.userMapper.schemaToDto(userSchemaUpdate);
  }
}
