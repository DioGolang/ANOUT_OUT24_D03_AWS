import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientRepository } from '../../../../../domain/interfaces/repositories/ClientRepository.interface';
import { ClientSchema } from '../../entities/client.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../../../../../domain/entities/client.entity';
import { ListClientDto } from '../../../../../application/client/dto/list-client.dto';
import { UpdateClientDto } from '../../../../../application/client/dto/update-client.dto';

@Injectable()
export class ClientRepositoryImpl implements ClientRepository {
  constructor(
    @InjectRepository(ClientSchema)
    private readonly clientSchema: Repository<ClientSchema>,
  ) {}

  async findByEmail(email: string): Promise<ClientSchema> {
    const client = this.clientSchema.findOne({ where: { email } });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async findByCpfStatus(cpf: string): Promise<ClientSchema> {
    const client = await this.clientSchema.findOne({
      where: { cpf: cpf, status: true },
    });
    console.log('passou aqui!!', client);
    return client;
  }

  delete(): void {
    throw new Error('Method not implemented.');
  }

  async list(filter: ListClientDto = {}): Promise<ClientSchema[]> {
    const query = this.clientSchema.createQueryBuilder('client');

    if (filter.email) {
      query.andWhere('client.email LIKE :email', {
        email: `%${filter.email}%`,
      });
    }
    if (filter.name) {
      query.andWhere('client.name LIKE :name', { name: `%${filter.name}%` });
    }
    if (filter.cpf) {
      query.andWhere('client.cpf LIKR :cpf', { cpf: `%${filter.cpf}%` });
    }
    if (filter.status !== undefined) {
      query.andWhere('client.status = :status', { status: filter.status });
    }

    const [clients] = await query
      .take(filter.limit)
      .skip((filter.page - 1) * filter.limit)
      .getManyAndCount();

    return clients;
  }

  async findId(id: string): Promise<ClientSchema> {
    const client = this.clientSchema.findOne({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  create(client: Client): Promise<ClientSchema> {
    const clientSchema = new ClientSchema();
    clientSchema.email = client.email;
    clientSchema.name = client.name;
    clientSchema.cpf = client.cpf;
    clientSchema.tel = client.tel;
    clientSchema.dateOfBirth = client.dateOfBird;
    clientSchema.status = client.status;
    return this.clientSchema.save(clientSchema);
  }

  async disable(id: string): Promise<ClientSchema> {
    const client = await this.findId(id);

    if (!client) {
      throw new NotFoundException('Client not found'); // if(!client) return false
    }

    if (!client.status) {
      throw new ConflictException('Client already disabled');
    }

    client.status = false;
    return this.clientSchema.save(client);
  }

  async update(id: string, dto: UpdateClientDto): Promise<ClientSchema> {
    const client = await this.findId(id);
    if (dto.email) client.email = dto.email;
    if (dto.name) client.name = dto.name;
    if (dto.cpf) client.cpf = dto.cpf;
    if (dto.tel) client.tel = dto.tel;
    if (dto.dateOfBirth) client.dateOfBirth = dto.dateOfBirth;
    return this.clientSchema.save(client);
  }
}
