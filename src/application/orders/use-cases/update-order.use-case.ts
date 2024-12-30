import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../../domain/interfaces/repositories/orderRepository.interface';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderDomainService } from '../../../domain/services/order/order-domain.service';
import { PostalCode } from '../../../domain/api/postal-code.interface';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CreateOrderResponseDto } from '../dto/create-order-response.dto';
import { OrdersStatusEnum } from '../../../domain/enum/ordersStatus.enum';
import { NotFoundOrderException } from '../../../domain/exceptions/not-found-order';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    private readonly orderMapper: OrderMapper,
    private readonly orderDomainService: OrderDomainService,
    @Inject('PostalCodeViaCep')
    private readonly postalCodeService: PostalCode,
  ) {}

  async execute(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    const order = await this.orderRepository.findId(id);

    if (!order) {
      throw new NotFoundOrderException();
    }

    if (updateOrderDto.initialDate) {
      order.initialDate = updateOrderDto.initialDate;
      await this.orderDomainService.orderInitialDateVerification(
        order.initialDate,
      );
    }

    if (updateOrderDto.finalDate) {
      order.finalDate = updateOrderDto.finalDate;
      await this.orderDomainService.orderFinalDateVerification(order.finalDate);
    }

    if (updateOrderDto.initialDate && updateOrderDto.finalDate) {
      await this.orderDomainService.orderInitialFinalDateVerification(
        order.initialDate,
        order.finalDate,
      );
    }

    if (updateOrderDto.status) order.status = updateOrderDto.status;

    if (updateOrderDto.cep) {
      const address = await this.postalCodeService.getPostalCodeInfo(
        updateOrderDto.cep,
      );
      order.address = address;
    }

    order.rentalFee = parseFloat(order.address.gia) / 100;

    const partialTotalRentalValue =
      Math.ceil(
        Math.abs(
          new Date(order.finalDate).getTime() -
            new Date(order.initialDate).getTime(),
        ) /
          (1000 * 60 * 60 * 24),
      ) * order.cars.dailyRate;
    order.totalRentalValue = partialTotalRentalValue + order.rentalFee;

    await this.orderDomainService.orderStatusVerification(id, order);

    if (order.status == OrdersStatusEnum.CLOSED) {
      order.orderClosingDate = new Date();

      if (
        new Date(order.orderClosingDate).getTime() >
        new Date(order.finalDate).getTime()
      ) {
        const initialDateT = new Date(order.finalDate).getTime();
        const finalDateT = new Date(order.orderClosingDate).getTime();
        const days = Math.ceil(
          Math.abs(finalDateT - initialDateT) / (1000 * 60 * 60 * 24),
        );

        order.lateFee = parseFloat(
          (days * order.cars.dailyRate * 2).toFixed(2),
        );
      }
    }

    const orderSchema = await this.orderRepository.update(id, order);
    return this.orderMapper.schemaToDto(orderSchema);
  }
}
