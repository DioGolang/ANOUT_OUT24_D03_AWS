import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/repositories/userRepository.interface';
import { UserSchema } from '../persistence/postgres/entities/user.schema';
import { Crypt } from '../../domain/interfaces/crypt/crypt.interface';
import { Password } from '../../domain/value-objects/password.vo';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('Crypt')
    private readonly crypt: Crypt,
    private readonly configService: ConfigService,
  ) {}

  async createUser() {
    const name = this.configService.get<string>('DEFAULT_USER_NAME');
    const email = this.configService.get<string>('DEFAULT_USER_EMAIL');
    const password = this.configService.get<string>('DEFAULT_USER_PASSWORD');
    const userExists = await this.userRepository.userExists(email);

    if (userExists) {
      console.log(`Default user with email "${email}" already exists.`);
      return false;
    }

    Password.setHasher(this.crypt);
    const hashedPassword = await Password.create(password);
    const passwordhashed = hashedPassword.toString();
    const user = new UserSchema();
    user.name = name;
    user.email = email;
    user.status = true;
    user.passwordHash = passwordhashed;
    await this.userRepository.create(user);
    console.log(`Default user with email "${email}" has been created.`);
    console.log(`Password: ${password}`);
  }
}
