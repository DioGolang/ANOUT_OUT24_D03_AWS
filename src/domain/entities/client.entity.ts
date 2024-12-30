import { ClientProps } from '../interfaces/props/client-props.interface';
import { InvalidClientException } from '../exceptions/invalid-client.exception';
import { UpdateClientDto } from '../../application/client/dto/update-client.dto';
import { Cpf } from '../value-objects/cpf.vo';

//export class Clients {
export class Client {
  private readonly _id?: string;
  private readonly _props: ClientProps;
  constructor(props: ClientProps, id?: string) {
    if (!this.validateCpf) {
      throw new InvalidClientException('Cpf is Invalid');
    }

    this._id = id;
    this._props = props;
  }

  private validateCpf(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF tem 11 dígitos ou é uma sequência repetida
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    // Calcula os dois dígitos verificadores
    let soma = 0;
    let resto;

    // Primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;

    // Segundo dígito verificador
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    return true;
  }

  updateDetails(dto: UpdateClientDto): void {
    if (dto.email) this._props.email = dto.email;
    if (dto.name) this._props.name = dto.name;
    if (dto.cpf) this._props.cpf = new Cpf(dto.cpf);
    if (dto.tel) this._props.tel = dto.tel;
    if (dto.dateOfBirth) this._props.dateOfBirth = dto.dateOfBirth;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._props.email;
  }

  get name(): string {
    return this._props.name;
  }

  get cpf(): string {
    return this._props.cpf.value;
  }

  get tel(): string {
    return this._props.tel;
  }

  get dateOfBird(): Date {
    return this._props.dateOfBirth;
  }

  get status(): boolean {
    return this._props.status;
  }
}
