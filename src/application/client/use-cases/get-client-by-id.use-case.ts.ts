import { Inject, Injectable } from '@nestjs/common';
import { ClientRepository } from '../../../domain/interfaces/repositories/ClientRepository.interface';
import { ClientMapper } from '../mapper/client.mapper';
import { NotFoundClientException } from '../../../domain/exceptions/not-found-client';

Injectable();
export class GetClientByIdUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(id: string) {
    const clientExists = await this.clientRepository.findId(id);
    if (!clientExists) {
      throw new NotFoundClientException();
    }
    const schema = await this.clientRepository.findId(id);
    return this.clientMapper.schemaToDto(schema);
  }
}
