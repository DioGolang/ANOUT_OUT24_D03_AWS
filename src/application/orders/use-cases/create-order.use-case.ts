import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../../domain/interfaces/repositories/orderRepository.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderDomainService } from '../../../domain/services/order/order-domain.service';
import { PostalCode } from '../../../domain/api/postal-code.interface';
import { OrdersStatusEnum } from '../../../domain/enum/ordersStatus.enum';
import { CreateOrderResponseDto } from '../dto/create-order-response.dto';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    private readonly orderMapper: OrderMapper,
    private readonly orderDomainService: OrderDomainService,
    @Inject('PostalCodeViaCep')
    private readonly postalCodeService: PostalCode,
  ) {}

  async execute(
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    await this.orderDomainService.clientActive(createOrderDto.clientsId);
    await this.orderDomainService.carActive(createOrderDto.carsId);
    await this.orderDomainService.clientOpenOrder(createOrderDto.clientsId);
    await this.orderDomainService.carOpenOrder(createOrderDto.carsId);

    const address = await this.postalCodeService.getPostalCodeInfo(
      createOrderDto.cep,
    );
    const order = await this.orderMapper.dtoToDomain(createOrderDto, address);
    const orderSchema = await this.orderRepository.create(order);
    return this.orderMapper.schemaToDto(orderSchema);
  }
}
