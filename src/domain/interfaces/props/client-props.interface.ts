import { Cpf } from '../../value-objects/cpf.vo';

export interface ClientProps {
  email: string;
  name: string;
  cpf: Cpf;
  tel: string;
  dateOfBirth: Date;
  status?: boolean;
}
