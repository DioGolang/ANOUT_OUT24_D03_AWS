import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../../domain/interfaces/repositories/orderRepository.interface';
import { OrderMapper } from '../mapper/order.mapper';
import { CreateOrderResponseDto } from '../dto/create-order-response.dto';
import { NotFoundOrderException } from '../../../domain/exceptions/not-found-order';

@Injectable()
export class InactivateOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    private readonly orderMapper: OrderMapper,
  ) {}

  async execute(id: string): Promise<CreateOrderResponseDto> {
    const orderExists = await this.orderRepository.findId(id);
    if (!orderExists) {
      throw new NotFoundOrderException();
    }
    const orderSchema = await this.orderRepository.inactivate(id);
    return this.orderMapper.schemaToDto(orderSchema);
  }
}
