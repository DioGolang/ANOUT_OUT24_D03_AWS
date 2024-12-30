import { ClientProps } from '../interfaces/props/client-props.interface';
import { Client } from '../entities/client.entity';
import { Cpf } from '../value-objects/cpf.vo';

export class ClientBuilder {
  private _id?: string;
  private _props: Partial<ClientProps> = {};

  setId(id: string): this {
    console.log('Passei por aqui', id);
    this._id = id;
    return this;
  }

  setEmail(email: string): this {
    this._props.email = email;
    return this;
  }

  setName(name: string): this {
    this._props.name = name;
    return this;
  }

  setCpf(cpf: string): this {
    this._props.cpf = new Cpf(cpf);
    return this;
  }

  setTel(tel: string): this {
    this._props.tel = tel;
    return this;
  }

  setDateOfBirth(dateOfBirth: Date): this {
    this._props.dateOfBirth = dateOfBirth;
    return this;
  }

  setStatus(status?: boolean): this {
    this._props.status = status;
    return this;
  }

  build(): Client {
    // this.validateRequiredFields();
    const client = new Client(this._props as ClientProps, this._id);
    return client;
  }

  // private validateRequiredFields(): void {
  //   if (!this._id) {
  //     throw new Error('Car id is required');
  //   }
  //   if (!this._props.marca) {
  //     throw new Error('Car marca is required');
  //   }
  //   if (!this._props.model) {
  //     throw new Error('Car model is required');
  //   }
  //
  //   if (!this._props.plate) {
  //     throw new Error('Car plate is required');
  //   }
  //
  //   if (!this._props.year) {
  //     throw new Error('Car year is required');
  //   }
  //
  //   if (!this._props.km) {
  //     throw new Error('Car km is required');
  //   }
  //
  //   if (!this._props.dailyRate) {
  //     throw new Error('Car dailyRate is required');
  //   }
  // }
}
