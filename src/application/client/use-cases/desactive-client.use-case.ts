import { Inject, Injectable } from '@nestjs/common';
import { ClientRepository } from '../../../domain/interfaces/repositories/ClientRepository.interface';
import { ClientMapper } from '../mapper/client.mapper';

@Injectable()
export class DesactiveClientUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(id: string) {
    const schema = await this.clientRepository.disable(id);
    return this.clientMapper.schemaToDto(schema);
  }
}
