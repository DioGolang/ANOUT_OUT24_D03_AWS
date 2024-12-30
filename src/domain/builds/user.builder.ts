import { UserProps } from '../interfaces/props/user-props.interface';
import { User } from '../entities/user.entity';
import { Password } from '../value-objects/password.vo';
import { Email } from '../value-objects/email.vo';
import { Crypt } from '../interfaces/crypt/crypt.interface';

export class UserBuilder {
  private _id: string;
  private _password: Password;
  private _props: Partial<UserProps> = {};

  setId(id: string): this {
    this._id = id;
    return this;
  }

  async setPassword(password: string, hash: Crypt): Promise<this> {
    Password.setHasher(hash);
    this._password = await Password.create(password);
    return this;
  }

  setName(name: string): this {
    this._props.name = name;
    return this;
  }

  setEmail(email: string): this {
    this._props.email = new Email(email);
    return this;
  }

  setStatus(status: boolean): this {
    this._props.status = status;
    return this;
  }

  build(): User {
    // this.validateRequiredFields();
    const user = new User(this._id, this._password, this._props as UserProps);
    return user;
  }

  // private validateRequiredFields(): void {
  //   if (!this._id) {
  //     throw new Error('User id is required');
  //   }
  //   if (!this._password) {
  //     throw new Error('User password is required');
  //   }
  //   if (!this._props.name) {
  //     throw new Error('User name is required');
  //   }
  //
  //   if (!this._props.email) {
  //     throw new Error('User email is required');
  //   }
  //
  //   if (!this._props.status) {
  //     throw new Error('User status is required');
  //   }
  // }
}
