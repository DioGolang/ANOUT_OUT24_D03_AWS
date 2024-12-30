import { PersistenceFactory } from './persistence-factory';
import { ClientSchema } from '../../../infra/persistence/postgres/entities/client.schema';
import { CreateClientDto } from '../../../application/client/dto/create-client.dto';

export interface ClientPersistenceInterface
  extends PersistenceFactory<ClientSchema, CreateClientDto> {
  configureSchema(
    schema: ClientSchema,
    domain: CreateClientDto,
  ): Promise<ClientSchema>;
}
