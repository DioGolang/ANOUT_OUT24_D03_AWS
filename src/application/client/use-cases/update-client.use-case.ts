import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ClientMapper } from '../mapper/client.mapper';
import { ClientRepository } from '../../../domain/interfaces/repositories/ClientRepository.interface';
import { UpdateClientDto } from '../dto/update-client.dto';
import { NotFoundClientException } from '../../../domain/exceptions/not-found-client';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(id: string, dto: UpdateClientDto) {
    const clientExists = await this.clientRepository.findId(id);
    if (!clientExists) {
      throw new NotFoundClientException();
    }
    if (dto.email) {
      const clientExists = await this.clientRepository.findByEmail(dto.email);
      if (clientExists) {
        throw new ConflictException('Client with email already exists');
      }
    }
    const client = await this.clientMapper.schemaToDomain(clientExists);
    client.updateDetails(dto);
    const schema = await this.clientRepository.update(id, dto);
    return this.clientMapper.schemaToDto(schema);
  }
}
