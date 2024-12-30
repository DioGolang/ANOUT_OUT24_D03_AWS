import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../../../application/orders/dto/create-order.dto';
import { CarRepository } from '../../interfaces/repositories/carRepository.interface';
import { ClientRepository } from '../../interfaces/repositories/ClientRepository.interface';
import { OrdersSchema } from '../../../infra/persistence/postgres/entities/orders.schema';
import { AddressDto } from '../../../application/shared/validators/dto/addressDto';
import { OrderPersistenceInterface } from './order-persistence.interface';

@Injectable()
export class OrderPersistenceFactory implements OrderPersistenceInterface {
  constructor(
    @Inject('CarRepository')
    private readonly carRepository: CarRepository,
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
  ) {}

  createSchema(): OrdersSchema {
    return new OrdersSchema();
  }

  async configureSchema(
    schema: OrdersSchema,
    domain: CreateOrderDto,
    address: AddressDto,
  ): Promise<OrdersSchema> {
    schema.initialDate = domain.initialDate;
    schema.finalDate = domain.finalDate;
    schema.address = address;
    schema.rentalFee = domain.rentalFee;
    schema.totalRentalValue = domain.totalRentalValue;
    schema.orderClosingDate = domain.orderClosingDate;
    schema.lateFee = domain.lateFee;
    schema.status = domain.status;
    schema.cars = await this.carRepository.findId(domain.carsId);
    schema.clients = await this.clientRepository.findId(domain.clientsId);
    return schema;
  }
}
