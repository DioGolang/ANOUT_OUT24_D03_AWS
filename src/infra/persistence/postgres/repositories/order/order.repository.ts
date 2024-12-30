import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from '../../../../../domain/interfaces/repositories/orderRepository.interface';
import { Repository } from 'typeorm';
import { Order } from '../../../../../domain/entities/order.entity';
import { CarRepository } from '../../../../../domain/interfaces/repositories/carRepository.interface';
import { ClientRepository } from '../../../../../domain/interfaces/repositories/ClientRepository.interface';
import { OrdersSchema } from '../../entities/orders.schema';
import { Inject } from '@nestjs/common';
import { OrdersStatusEnum } from '../../../../../domain/enum/ordersStatus.enum';
import { ListOrderDto } from '../../../../../application/orders/dto/list-order.dto';

export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectRepository(OrdersSchema)
    private readonly orderSchema: Repository<OrdersSchema>,
    @Inject('CarRepository')
    private readonly carRepository: CarRepository,
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
  ) {}

  async create(order: Order): Promise<OrdersSchema> {
    const client = await this.clientRepository.findId(order.clients.id);
    const car = await this.carRepository.findId(order.cars.id);
    const schema = new OrdersSchema();
    schema.initialDate = order.initialDate;
    schema.finalDate = order.finalDate;
    schema.address = order.address;
    schema.rentalFee = order.rentalFee;
    schema.totalRentalValue = order.totalRentalValue;
    schema.orderClosingDate = order.orderClosingDate;
    schema.lateFee = order.lateFee;
    schema.status = OrdersStatusEnum.OPEN;
    schema.cars = car;
    schema.clients = client;
    console.log(schema);
    return this.orderSchema.save(schema);
  }

  async findId(id: string): Promise<OrdersSchema> {
    return this.orderSchema.findOne({
      where: { id },
      relations: { cars: true, clients: true },
    });
  }

  async update(id: string, dto: Order): Promise<OrdersSchema> {
    const order = await this.findId(id);

    if (dto.initialDate) order.initialDate = dto.initialDate;
    if (dto.finalDate) order.finalDate = dto.finalDate;
    if (dto.address) order.address = dto.address;
    if (dto.status) order.status = dto.status;
    if (dto.rentalFee) order.rentalFee = dto.rentalFee;
    if (dto.totalRentalValue) order.totalRentalValue = dto.totalRentalValue;
    if (dto.orderClosingDate) order.orderClosingDate = dto.orderClosingDate;
    if (dto.lateFee) order.lateFee = dto.lateFee;

    return this.orderSchema.save(order);
  }

  async list(filter: ListOrderDto = {}): Promise<OrdersSchema[]> {
    console.log(filter);
    const query = this.orderSchema
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.clients', 'client');

    if (filter.status) {
      query.andWhere('order.status = :status', {
        status: filter.status,
      });
    }

    if (filter.clientCpf) {
      query.andWhere('client.cpf = :clientCpf', {
        clientCpf: filter.clientCpf,
      });
    }

    const [order] = await query
      .take(filter.limit)
      .skip((filter.page - 1) * filter.limit)
      .getManyAndCount();

    return order;
  }

  delete(): void {
    throw new Error('Method not implemented.');
  }

  async inactivate(id: string): Promise<OrdersSchema> {
    const order = await this.findId(id);
    order.status = OrdersStatusEnum.CANCELED;
    return this.orderSchema.save(order);
  }

  async clientActive(clientId: string) {
    return this.clientRepository.findId(clientId);
  }

  async clientOpenOrder(clientId: string) {
    const order = await this.orderSchema.findOne({
      where: [
        {
          clients: { id: clientId },
          status: OrdersStatusEnum.OPEN,
        },
        { clients: { id: clientId }, status: OrdersStatusEnum.APPROVED },
      ],
    });
    return order;
  }

  async carActive(carId: string) {
    return this.carRepository.findId(carId);
  }

  async carOpenOrder(carsId: string) {
    const order = await this.orderSchema.findOne({
      where: [
        {
          cars: { id: carsId },
          status: OrdersStatusEnum.OPEN,
        },
        { cars: { id: carsId }, status: OrdersStatusEnum.APPROVED },
      ],
    });
    return order;
  }
}
