import { CreateOrderUseCase } from './create-order.use-case';
import { InactivateOrderUseCase } from './inactive-order.use-case';
import { GetOrderByIdUseCase } from './get-order-by-id.use-case';
import { ListOrderUseCase } from './list-order.use-case';
import { UpdateOrderUseCase } from './update-order.use-case';

export const orderUseCases = [
  CreateOrderUseCase,
  UpdateOrderUseCase,
  ListOrderUseCase,
  GetOrderByIdUseCase,
  InactivateOrderUseCase,
];
