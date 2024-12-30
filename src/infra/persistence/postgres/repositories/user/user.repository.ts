import { UserRepository } from '../../../../../domain/interfaces/repositories/userRepository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from '../../entities/user.schema';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/application/user/dto/update-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ListUserDto } from '../../../../../application/user/dto/list-user.dto';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userSchema: Repository<UserSchema>,
  ) {}

  async create(userSchema: UserSchema): Promise<UserSchema> {
    return await this.userSchema.save(userSchema);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserSchema> {
    const user = await this.userSchema.findOne({
      where: { id: id, status: true },
    });

    if (!user) {
      throw new NotFoundException('User status inactive');
    }

    if (dto.name) user.name = dto.name;
    if (dto.email) user.email = dto.email;
    if (dto.password) user.passwordHash = dto.password;
    return await this.userSchema.save(user);
  }
  delete() {
    throw new Error('Method not implemented.');
  }
  async list(filter: ListUserDto = {}): Promise<UserSchema[]> {
    const query = this.userSchema.createQueryBuilder('user');

    if (filter.name) {
      query.andWhere('user.name LIKE :name', { name: `%${filter.name}%` });
    }
    if (filter.email) {
      query.andWhere('user.email LIKE :email', { email: `%${filter.email}%` });
    }
    if (filter.status !== undefined) {
      query.andWhere('user.status = :status', { status: filter.status });
    }

    const [users] = await query
      .take(filter.limit)
      .skip((filter.page - 1) * filter.limit)
      .getManyAndCount();
    return users;
  }
  async findId(id: string): Promise<UserSchema> {
    const user = await this.userSchema.findOne({
      where: { id: id },
    });
    console.log(user);
    return user;
  }

  async disable(id: string): Promise<UserSchema> {
    const user = await this.userSchema.findOne({
      where: { id: id },
    });

    if (user.status === false) {
      throw new BadRequestException('User already inactive');
    }
    user.status = false;
    return this.userSchema.save(user);
  }

  async enable(id: string): Promise<UserSchema> {
    const user = await this.userSchema.findOne({
      where: { id: id },
    });

    if (user.status === true) {
      throw new BadRequestException('User already active');
    }
    user.status = true;
    return this.userSchema.save(user);
  }

  async userExists(email: string): Promise<UserSchema> {
    const user = await this.userSchema.findOne({
      where: { email: email, status: true },
    });
    console.log(user);
    return user;
  }
}
