import { ListOrderDto } from '../../../application/orders/dto/list-order.dto';
import { UpdateOrderDto } from '../../../application/orders/dto/update-order.dto';
import { OrdersSchema } from '../../../infra/persistence/postgres/entities/orders.schema';
import { Order } from '../../entities/order.entity';
import { Repository } from './repository.interface';

export interface OrderRepository
  extends Repository<Order, OrdersSchema, UpdateOrderDto> {
  clientActive(clientId: string);

  clientOpenOrder(clientId: string);

  carActive(carId: string);

  carOpenOrder(carId: string);

  inactivate(orderId: string): Promise<OrdersSchema>;

  list(filter: ListOrderDto): Promise<OrdersSchema[]>;
}
