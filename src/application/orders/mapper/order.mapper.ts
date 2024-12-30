import { plainToClass } from 'class-transformer';
import { CreateOrderResponseDto } from '../dto/create-order-response.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CarRepository } from '../../../domain/interfaces/repositories/carRepository.interface';
import { ClientRepository } from '../../../domain/interfaces/repositories/ClientRepository.interface';
import { CarMapper } from '../../cars/mapper/car.mapper';
import { ClientMapper } from '../../client/mapper/client.mapper';
import { OrderBuilderFactoryInterface } from '../../../domain/factories/build/order-build.factory.interface';
import { OrdersSchema } from '../../../infra/persistence/postgres/entities/orders.schema';
import { AddressDto } from '../../shared/validators/dto/addressDto';
import { OrderPersistenceInterface } from '../../../domain/factories/persistence/order-persistence.interface';

//  implements Mapper<OrdersSchema, CreateOrderDto, CreateOrderResponseDto>
@Injectable()
export class OrderMapper {
  constructor(
    @Inject('OrderPersistenceFactory')
    private readonly orderPersistenceFactory: OrderPersistenceInterface,
    @Inject('CarRepository')
    private readonly carRepository: CarRepository,
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    private readonly carMapper: CarMapper,
    private readonly clientMapper: ClientMapper,
    @Inject('OrderBuildFactory')
    private readonly orderBuilderFactoryInterface: OrderBuilderFactoryInterface,
  ) {}

  async dtoToSchema(
    dto: CreateOrderDto,
    address: AddressDto,
  ): Promise<OrdersSchema> {
    const orderSchema = this.orderPersistenceFactory.createSchema();
    return await this.orderPersistenceFactory.configureSchema(
      orderSchema,
      dto,
      address,
    );
  }

  async schemaToDto(schema: OrdersSchema): Promise<CreateOrderResponseDto> {
    return plainToClass(CreateOrderResponseDto, schema, {
      excludeExtraneousValues: true,
    });
  }

  async dtoToDomain(dto: CreateOrderDto, address: AddressDto): Promise<any> {
    const carSchema = await this.carRepository.findId(dto.carsId);
    if (!carSchema) {
      throw new Error('Car not found');
    }
    const clientSchema = await this.clientRepository.findId(dto.clientsId);
    if (!clientSchema) {
      throw new Error('Client not found');
    }
    const car = await this.carMapper.schemaToDomain(carSchema);
    const client = await this.clientMapper.schemaToDomain(clientSchema);
    const orderBuilder = this.orderBuilderFactoryInterface.createBuilder();
    await this.orderBuilderFactoryInterface.configureBuilder(
      orderBuilder,
      dto,
      address,
      car,
      client,
    );
    return orderBuilder.build();
  }

  async toDomainList(
    schemas: OrdersSchema[],
  ): Promise<CreateOrderResponseDto[]> {
    const order = [];
    for (const schema of schemas) {
      order.push(await this.schemaToDto(schema));
    }
    return order;
  }
}
