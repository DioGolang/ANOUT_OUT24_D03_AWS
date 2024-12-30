import { Injectable } from '@nestjs/common';
import { PersistenceFactory } from './persistence-factory';
import { CreateClientDto } from '../../../application/client/dto/create-client.dto';
import { ClientSchema } from '../../../infra/persistence/postgres/entities/client.schema';

@Injectable()
export class ClientPersistenceFactory
  implements PersistenceFactory<ClientSchema, CreateClientDto>
{
  createSchema() {
    return new ClientSchema();
  }
  async configureSchema(
    schema: ClientSchema,
    domain: CreateClientDto,
  ): Promise<ClientSchema> {
    schema.email = domain.email;
    schema.name = domain.name;
    schema.cpf = domain.cpf;
    schema.tel = domain.tel;
    schema.dateOfBirth = domain.dateOfBirth;
    //schema.status = domain.status;
    return schema;
  }
}
