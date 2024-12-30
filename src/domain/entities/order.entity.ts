import { OrdersStatusEnum } from '../enum/ordersStatus.enum';
import { AddressVo } from '../value-objects/address.vo';
import { OrderProps } from '../interfaces/props/order-props.interface';
import { Cars } from './cars.entity';
import { Client } from './client.entity';

export class Order {
  private readonly _id?: string;
  private readonly _props: OrderProps;

  constructor(props: OrderProps, id?: string) {
    this._id = id;
    this._props = props;
  }

  get id(): string {
    return this._id;
  }
  //
  // set totalRentalValue() {
  //   const initialDateT = new Date(this._props.initialDate).getTime();
  //   console.log(`initialDateT: ${initialDateT}`);
  //   const finalDateT = new Date(this._props.finalDate).getTime();
  //   const totalDays =
  //     Math.ceil(Math.abs(finalDateT - initialDateT)) / (1000 * 60 * 60 * 24);
  //   this._props.totalRentalValue =
  //     totalDays * this._props.cars.dailyRate + this._props.rentalFee;
  //   console.log('DailyRate', this._props.cars.dailyRate);
  //   console.log('Car', this._props.cars);
  //   console.log(
  //     `initialDateT: ${initialDateT}, finalDateT: ${finalDateT}, totalDays: ${totalDays}, totalRentalValue: ${this._props.totalRentalValue}`,
  //   );
  // }

  get initialDate(): Date {
    return this._props.initialDate;
  }

  get finalDate(): Date {
    return this._props.finalDate;
  }

  get address(): AddressVo {
    return this._props.address;
  }

  get rentalFee(): number {
    return this._props.rentalFee;
  }

  get totalRentalValue(): number {
    return this._props.totalRentalValue;
  }

  get orderClosingDate(): Date {
    return this._props.orderClosingDate;
  }

  get lateFee(): number {
    return this._props.lateFee;
  }

  get status(): OrdersStatusEnum {
    return this._props.status;
  }

  get cars(): Cars {
    return this._props.cars;
  }

  get clients(): Client {
    return this._props.clients;
  }
}
