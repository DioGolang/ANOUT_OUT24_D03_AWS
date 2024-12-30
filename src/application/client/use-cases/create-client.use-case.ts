import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientRepository } from '../../../domain/interfaces/repositories/ClientRepository.interface';
import { ClientMapper } from '../mapper/client.mapper';
import { CreateClientResponseDto } from '../dto/create-client-response.dto';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(
    createClientDto: CreateClientDto,
  ): Promise<CreateClientResponseDto> {
    //const clientExists = await this.clientRepository.findByEmail(
    //  createClientDto.email,
    //);
    //if (clientExists) {
    //  throw new ConflictException('Client already exists!');
    //}

    const clientCpfStatusExists = await this.clientRepository.findByCpfStatus(
      createClientDto.cpf,
    );
    if (clientCpfStatusExists) {
      throw new ConflictException('Client already exists!!');
    }

    const client = await this.clientMapper.dtoToDomain(createClientDto);
    const schema = await this.clientRepository.create(client);
    return this.clientMapper.schemaToDto(schema);
  }
}
//Api => controller => useCase => repositorio
