import { Injectable } from '@nestjs/common';
import { OrderBuilder } from '../../builds/order.builder';
import { OrdersStatusEnum } from '../../enum/ordersStatus.enum';
import { Cars } from '../../entities/cars.entity';
import { Client } from '../../entities/client.entity';
import { AddressDto } from '../../../application/shared/validators/dto/addressDto';
import { OrderBuilderFactoryInterface } from './order-build.factory.interface';

interface OrderData {
  id: string;
  initialDate: Date;
  finalDate: Date;
  address: AddressDto;
  rentalFee: number;
  totalRentalValue: number;
  orderClosingDate: Date;
  lateFee: number;
  status: OrdersStatusEnum;
  cars: Cars;
  clients: Client;
}

@Injectable()
export class OrderFactory implements OrderBuilderFactoryInterface {
  createBuilder(): OrderBuilder {
    return new OrderBuilder();
  }

  async configureBuilder(
    builder: OrderBuilder,
    data: OrderData,
    address: AddressDto,
    cars: Cars,
    client: Client,
  ): Promise<OrderBuilder> {
    const resolvedBuilder = builder;
    resolvedBuilder
      .setId(data.id)
      .setCars(cars)
      .setClients(client)
      .setInitialDate(data.initialDate)
      .setFinalDate(data.finalDate)
      .setAddress(address)
      .setRentalFee()
      .setTotalRentalValue()
      .setOrderClosingDate(data.orderClosingDate)
      .setLateFee()
      .setStatus(data.status);
    return resolvedBuilder;
  }
}
