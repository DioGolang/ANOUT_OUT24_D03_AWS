import { PersistenceFactory } from './persistence-factory';
import { OrdersSchema } from '../../../infra/persistence/postgres/entities/orders.schema';
import { CreateOrderDto } from '../../../application/orders/dto/create-order.dto';

export interface OrderPersistenceInterface
  extends PersistenceFactory<OrdersSchema, CreateOrderDto> {
  configureSchema(
    schema: OrdersSchema,
    domain: CreateOrderDto,
    address: any,
  ): Promise<OrdersSchema>;
}
