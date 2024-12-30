import { Crypt } from '../interfaces/crypt/crypt.interface';

export class Password {
  private readonly value: string;
  private static passwordHasher: Crypt;

  private constructor(password: string) {
    this.value = password;
  }

  static setHasher(passwordHasher: Crypt) {
    Password.passwordHasher = passwordHasher;
  }

  static async create(password: string): Promise<Password> {
    const hashedPassword = await Password.passwordHasher.hash(password);
    return new Password(hashedPassword);
  }

  async compare(rawPassword: string): Promise<boolean> {
    return Password.passwordHasher.compare(rawPassword, this.value);
  }

  toString(): string {
    return this.value;
  }
}
