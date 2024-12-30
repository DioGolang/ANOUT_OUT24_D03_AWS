import { Mapper } from '../../interfaces/mapper.interface';
import { ClientSchema } from '../../../infra/persistence/postgres/entities/client.schema';
import { CreateClientDto } from '../dto/create-client.dto';
import { CreateClientResponseDto } from '../dto/create-client-response.dto';
import { Client } from '../../../domain/entities/client.entity';
import { PersistenceFactory } from '../../../domain/factories/persistence/persistence-factory';
import { Inject } from '@nestjs/common';
import { ClientBuilder } from '../../../domain/builds/client.builder';
import { plainToClass } from 'class-transformer';
import { ClientBuilderFactoryInterface } from '../../../domain/factories/build/client-build.factory.interface';

export class ClientMapper
  implements Mapper<ClientSchema, CreateClientDto, CreateClientResponseDto>
{
  constructor(
    @Inject('ClientPersistenceFactory')
    private readonly clientPersistenceFactory: PersistenceFactory<
      ClientSchema,
      CreateClientDto
    >,
    @Inject('ClientBuildFactory')
    private readonly clientBuildFactory: ClientBuilderFactoryInterface,
  ) {}

  async schemaToDto(schema: ClientSchema): Promise<CreateClientResponseDto> {
    return plainToClass(CreateClientResponseDto, schema, {
      excludeExtraneousValues: true,
    });
  }
  dtoToSchema(dto: CreateClientDto): Promise<ClientSchema> {
    throw new Error('Method not implemented.');
  }

  async dtoToDomain(dto: CreateClientDto): Promise<Client> {
    const clientBuilder = this.clientBuildFactory.createBuilder();
    //await this.clientBuildFactory.configureBuilder(ClientBuilder, dto);
    clientBuilder
      .setEmail(dto.email)
      .setName(dto.name)
      .setCpf(dto.cpf)
      .setTel(dto.tel)
      .setDateOfBirth(dto.dateOfBirth);
    //.setStatus(dto.status);
    console.log('eu passei aqui', clientBuilder);
    return clientBuilder.build();
  }

  async toDomainList(
    schemas: ClientSchema[],
  ): Promise<CreateClientResponseDto[]> {
    const client = [];
    for (const schema of schemas) {
      client.push(await this.schemaToDto(schema));
    }
    console.log(client)
    return client;
  }


  async schemaToDomain(client: ClientSchema) {
    console.log(` CPF: ${client.cpf}`)
    const build = new ClientBuilder();
    build.setId(client.id);
    build.setEmail(client.email);
    build.setName(client.name);
    build.setCpf(client.cpf);
    build.setTel(client.tel);
    build.setDateOfBirth(client.dateOfBirth);
    build.setStatus(client.status);
    return build.build();
  }
}
