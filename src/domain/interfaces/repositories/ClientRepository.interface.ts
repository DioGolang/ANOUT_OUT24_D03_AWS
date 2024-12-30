import { ClientSchema } from '../../../infra/persistence/postgres/entities/client.schema';
import { Repository } from './repository.interface';
import { Client } from '../../entities/client.entity';
import { ListClientDto } from '../../../application/client/dto/list-client.dto';
import { UpdateClientDto } from '../../../application/client/dto/update-client.dto';

export interface ClientRepository
  extends Repository<Client, ClientSchema, UpdateClientDto> {
  findByEmail(Email: string): Promise<ClientSchema>;
  findByCpfStatus(cpf: string): Promise<ClientSchema>;
  list(filter: ListClientDto): Promise<ClientSchema[]>;
  disable(id: string): Promise<ClientSchema>;
}
