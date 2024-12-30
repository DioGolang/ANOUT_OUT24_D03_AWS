import { Inject, Injectable } from '@nestjs/common';
import { ClientRepository } from '../../../domain/interfaces/repositories/ClientRepository.interface';
import { ClientMapper } from '../mapper/client.mapper';
import { CreateClientResponseDto } from '../dto/create-client-response.dto';
import { ListClientDto } from '../dto/list-client.dto';

@Injectable()
export class ListClientUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(
    filter: Partial<ListClientDto> = {},
  ): Promise<CreateClientResponseDto[]> {
    const validatedFilter = Object.assign(new ListClientDto(), filter);
    const clients = await this.clientRepository.list(validatedFilter);
    return this.clientMapper.toDomainList(clients);
  }
}
