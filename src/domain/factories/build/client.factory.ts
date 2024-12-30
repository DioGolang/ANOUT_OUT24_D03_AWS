import { Injectable } from '@nestjs/common';
import { ClientBuilder } from '../../builds/client.builder';
import { BuilderFactory } from './builder.factory';

interface ClientData {
  id?: string;
  email: string;
  name: string;
  cpf: string;
  tel: string;
  dateOfBirth: Date;
  status?: boolean;
}

@Injectable()
export class ClientFactory extends BuilderFactory<ClientBuilder> {
  createBuilder(): ClientBuilder {
    return new ClientBuilder();
  }

  async configureBuilder(
    builder: ClientBuilder,
    data: ClientData,
  ): Promise<ClientBuilder> {
    return builder
      .setId(data.id)
      .setEmail(data.email)
      .setName(data.name)
      .setCpf(data.cpf)
      .setTel(data.tel)
      .setDateOfBirth(data.dateOfBirth)
      .setStatus(data.status);
  }
}
