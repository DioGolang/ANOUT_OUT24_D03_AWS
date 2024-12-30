import { Crypt } from '../../../domain/interfaces/crypt/crypt.interface';
import * as bcrypt from 'bcryptjs';

export class BcryptPasswordImpl implements Crypt {
  async hash(password: string): Promise<string> {
    if (!password) {
      throw new Error('Password must be provided');
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error(`Error while hashing password: ${error.message}`);
    }
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) {
      throw new Error('Both password and hashed password must be provided');
    }

    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error(`Error while comparing passwords: ${error.message}`);
    }
  }
}
