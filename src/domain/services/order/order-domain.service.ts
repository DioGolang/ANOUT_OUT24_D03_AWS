import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from '../../interfaces/repositories/orderRepository.interface';
import { OrdersStatusEnum } from '../../enum/ordersStatus.enum';
import { InvalidDateException } from '../../exceptions/invalid-date.exception';
import { OrdersSchema } from '../../../infra/persistence/postgres/entities/orders.schema';

@Injectable()
export class OrderDomainService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async clientActive(clientId: string): Promise<void> {
    const clientActive = await this.orderRepository.clientActive(clientId);
    if (!clientActive) {
      throw new ConflictException('Inactive client.');
    }
  }

  async clientOpenOrder(clientId: string): Promise<void> {
    const clientOpenOrder =
      await this.orderRepository.clientOpenOrder(clientId);
    if (clientOpenOrder) {
      throw new ConflictException('Client has an open/approved order.');
    }
  }

  async carActive(carId: string): Promise<void> {
    const carActive = await this.orderRepository.carActive(carId);
    if (!carActive) {
      throw new NotFoundException('Inactive car.');
    }
  }

  async carOpenOrder(carId: string): Promise<void> {
    const carOpenOrder = await this.orderRepository.carOpenOrder(carId);
    if (carOpenOrder) {
      throw new ConflictException('Car is in an open/approved order.');
    }
  }

  async orderStatusVerification(
    id: string,
    order: OrdersSchema,
  ): Promise<void> {
    if (order.status == OrdersStatusEnum.CANCELED) {
      throw new ConflictException("Can't update status to CANCELED.");
    }

    const orderRepository = await this.orderRepository.findId(id);

    if (
      order.status == OrdersStatusEnum.APPROVED &&
      !(orderRepository.status == OrdersStatusEnum.OPEN)
    ) {
      throw new ConflictException('Only OPEN orders can be APPROVED.');
    }

    if (
      order.status == OrdersStatusEnum.APPROVED &&
      (!order.initialDate ||
        !order.finalDate ||
        !order.rentalFee ||
        !order.totalRentalValue ||
        !order.address.city ||
        !order.address.state ||
        !order.address.gia ||
        !order.address.postalCode ||
        !order.cars ||
        !order.clients)
    ) {
      throw new ConflictException('Only complete orders can be APPROVED.');
    }

    if (
      order.status == OrdersStatusEnum.CLOSED &&
      !(orderRepository.status == OrdersStatusEnum.APPROVED)
    ) {
      throw new ConflictException('Only APPROVED orders can be CLOSED.');
    }
  }

  async orderInitialDateVerification(initialDate) {
    const date = new Date();
    const zeroDate = new Date(
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    );

    if (!(new Date(initialDate) >= zeroDate)) {
      throw new InvalidDateException();
    }
  }

  async orderFinalDateVerification(finalDate) {
    const date = new Date();
    const zeroDate = new Date(
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    );

    if (!(new Date(finalDate) >= zeroDate)) {
      throw new InvalidDateException();
    }
  }

  async orderInitialFinalDateVerification(initialDate, finalDate) {
    if (!(new Date(finalDate) >= new Date(initialDate))) {
      throw new InvalidDateException();
    }
  }
}
