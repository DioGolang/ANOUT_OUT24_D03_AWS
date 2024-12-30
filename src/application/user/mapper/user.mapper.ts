import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserSchema } from '../../../infra/persistence/postgres/entities/user.schema';
import { Mapper } from '../../interfaces/mapper.interface';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';
import { plainToClass } from 'class-transformer';
import { User } from '../../../domain/entities/user.entity';
import { UserBuilderFactoryInterface } from '../../../domain/factories/build/userbuild.factory.interface';
import { UserPersistenceInterface } from '../../../domain/factories/persistence/user-persistence.interface';

@Injectable()
export class UserMapper
  implements Mapper<UserSchema, CreateUserDto, CreateUserResponseDto>
{
  constructor(
    @Inject('UserPersistenceFactory')
    private readonly userPersistenceFactory: UserPersistenceInterface,
    @Inject('UserBuildFactory')
    private readonly userBuildFactory: UserBuilderFactoryInterface,
  ) {}

  async dtoToSchema(dto: CreateUserDto): Promise<UserSchema> {
    const userSchema = this.userPersistenceFactory.createSchema();
    return await this.userPersistenceFactory.configureSchema(userSchema, dto);
  }

  async schemaToDto(schema: UserSchema): Promise<CreateUserResponseDto> {
    return plainToClass(CreateUserResponseDto, schema, {
      excludeExtraneousValues: true,
    });
  }

  async DtoToDomain(dto: CreateUserDto): Promise<User> {
    const userBuilder = this.userBuildFactory.createBuilder();
    await this.userBuildFactory.configureBuilder(userBuilder, dto);
    return userBuilder.build(); // new User(userBuilder);
  }

  async toDomainList(schemas: UserSchema[]): Promise<CreateUserResponseDto[]> {
    return Promise.all(
      schemas.map(async (schema) => {
        return plainToClass(CreateUserResponseDto, schema, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }

  // async domainToSchema(domain: User): Promise<UserSchema> {
  //   const schema = new UserSchema();
  //   schema.id = domain.id;
  //   schema.name = domain.name;
  //   schema.email = domain.email.value;
  //   schema.password = domain.password.value;
  //   schema.status = domain.status;
  // }
  // return schema;
  // }
}
