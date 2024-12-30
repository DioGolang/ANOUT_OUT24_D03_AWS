import { Inject, Injectable } from '@nestjs/common';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderRepository } from '../../../domain/interfaces/repositories/orderRepository.interface';
import { NotFoundOrderException } from '../../../domain/exceptions/not-found-order';
import { CreateOrderResponseDto } from '../dto/create-order-response.dto';

@Injectable()
export class GetOrderByIdUseCase {
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
    const schema = await this.orderRepository.findId(id);
    console.log(schema);
    return this.orderMapper.schemaToDto(schema);
  }
}
