import { PersistenceFactory } from './persistence-factory';
import { UserSchema } from '../../../infra/persistence/postgres/entities/user.schema';
import { CreateUserDto } from '../../../application/user/dto/create-user.dto';

export interface UserPersistenceInterface
  extends PersistenceFactory<UserSchema, CreateUserDto> {
  createSchema(): UserSchema;
  configureSchema(
    schema: UserSchema,
    domain: CreateUserDto,
  ): Promise<UserSchema>;
}
