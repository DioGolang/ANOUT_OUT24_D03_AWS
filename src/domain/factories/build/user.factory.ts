import { BuilderFactory } from './builder.factory';
import { UserBuilder } from '../../builds/user.builder';
import { Crypt } from '../../interfaces/crypt/crypt.interface';
import { Inject } from '@nestjs/common';

interface UserData {
  id: string;
  passwordHash: string;
  name: string;
  email: string;
  status: boolean;
}

export class UserFactory extends BuilderFactory<UserBuilder> {
  constructor(@Inject('Crypt') private readonly crypt: Crypt) {
    super();
  }
  createBuilder(): UserBuilder {
    return new UserBuilder();
  }

  async configureBuilder(
    builder: UserBuilder,
    data: UserData,
  ): Promise<UserBuilder> {
    const builderWithPassword = await builder.setPassword(
      data.passwordHash,
      this.crypt,
    );
    builderWithPassword
      .setId(data.id)
      .setName(data.name)
      .setEmail(data.email)
      .setStatus(data.status);
    return builderWithPassword;
  }
}
