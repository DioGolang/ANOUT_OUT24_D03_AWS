import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';
import { UserProps } from '../interfaces/props/user-props.interface';
import { UpdateUserDto } from '../../application/user/dto/update-user.dto';

export class User {
  private readonly _id: string;
  private _passwordHash: Password;
  private readonly _props: UserProps;
  constructor(id: string, passwordHash: Password, props: UserProps) {
    this._id = id;
    this._passwordHash = passwordHash;
    this._props = props;
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._props.name;
  }

  get email(): Email {
    return this._props.email;
  }

  get passwordHash(): Password {
    return this._passwordHash;
  }

  get status(): boolean {
    return this._props.status;
  }
}
