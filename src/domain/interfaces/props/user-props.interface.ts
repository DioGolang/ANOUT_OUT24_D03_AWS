import { Email } from '../../value-objects/email.vo';

export interface UserProps {
  name: string;
  email: Email;
  status: boolean;
}
