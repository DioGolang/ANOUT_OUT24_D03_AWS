import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../../domain/interfaces/repositories/orderRepository.interface';
import { OrderMapper } from '../mapper/order.mapper';
import { ListOrderDto } from '../dto/list-order.dto';
import { CreateOrderResponseDto } from '../dto/create-order-response.dto';

@Injectable()
export class ListOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    private readonly orderMapper: OrderMapper,
  ) {}

  async execute(
    filter: Partial<ListOrderDto> = {},
  ): Promise<CreateOrderResponseDto[]> {
    const validatedFilter = Object.assign(new ListOrderDto(), filter);
    const cars = await this.orderRepository.list(validatedFilter);
    return this.orderMapper.toDomainList(cars);
  }
}
