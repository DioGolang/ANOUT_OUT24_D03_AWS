import { Cars } from '../../entities/cars.entity';
import { Client } from '../../entities/client.entity';
import { OrdersStatusEnum } from '../../enum/ordersStatus.enum';
import { AddressVo } from '../../value-objects/address.vo';

export interface OrderProps {
  initialDate: Date;
  finalDate: Date;
  address: AddressVo;
  rentalFee: number;
  totalRentalValue: number;
  orderClosingDate: Date;
  lateFee: number;
  status: OrdersStatusEnum;
  cars: Cars;
  clients: Client;
}
