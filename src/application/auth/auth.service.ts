import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/repositories/userRepository.interface';
import { Crypt } from '../../domain/interfaces/crypt/crypt.interface';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('Crypt')
    private readonly crypt: Crypt,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.userExists(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.crypt.compare(
      password,
      user.passwordHash,
    );
    if (isPasswordValid) {
      const { passwordHash, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid email or password');
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.userExists(loginDto.email);
    if (
      !user ||
      !(await this.crypt.compare(loginDto.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, username: user.name, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
