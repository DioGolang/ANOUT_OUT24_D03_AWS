import { Inject, Injectable } from '@nestjs/common';
import { UserSchema } from '../../../infra/persistence/postgres/entities/user.schema';
import { CreateUserDto } from '../../../application/user/dto/create-user.dto';
import { Crypt } from '../../interfaces/crypt/crypt.interface';
import { UserPersistenceInterface } from './user-persistence.interface';

@Injectable()
export class UserPersistenceFactory implements UserPersistenceInterface {
  constructor(
    @Inject('Crypt')
    private readonly crypt: Crypt,
  ) {}

  createSchema(): UserSchema {
    return new UserSchema();
  }
  async configureSchema(
    schema: UserSchema,
    domain: CreateUserDto,
  ): Promise<UserSchema> {
    schema.name = domain.name;
    schema.email = domain.email;
    schema.status = domain.status;
    schema.passwordHash = await this.crypt.hash(domain.passwordHash);
    return schema;
  }
}
