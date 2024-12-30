import { AddressDto } from '../../application/shared/validators/dto/addressDto';
import { Cars } from '../entities/cars.entity';
import { Client } from '../entities/client.entity';
import { Order } from '../entities/order.entity';
import { OrdersStatusEnum } from '../enum/ordersStatus.enum';
import { OrderProps } from '../interfaces/props/order-props.interface';
import { AddressVo } from '../value-objects/address.vo';
import { InvalidDateException } from '../exceptions/invalid-date.exception';

export class OrderBuilder {
  private _id?: string;
  private _props: Partial<OrderProps> = {};

  setId(id: string): this {
    this._id = id;
    return this;
  }

  setCars(cars: Cars): this {
    this._props.cars = cars;
    return this;
  }

  setClients(clients: Client): this {
    this._props.clients = clients;
    return this;
  }

  setInitialDate(initialDate: Date): this {
    this._props.initialDate = initialDate;
    return this;
  }

  setFinalDate(finalDate: Date): this {
    this._props.finalDate = finalDate;
    return this;
  }

  setAddress(address: AddressDto): this {
    this._props.address = new AddressVo(
      address.postalCode,
      address.city,
      address.state,
      address.gia,
    );
    return this;
  }

  setRentalFee(): this {
    this._props.rentalFee = parseFloat(this._props.address.gia) / 100;
    return this;
  }

  setTotalRentalValue(): this {
    const initialDateT = new Date(this._props.initialDate).getTime();
    console.log(`initialDateT: ${initialDateT}`);
    const finalDateT = new Date(this._props.finalDate).getTime();
    const totalDays = Math.ceil(
      Math.abs(finalDateT - initialDateT) / (1000 * 60 * 60 * 24),
    );
    const partialTotalRentalValue = totalDays * this._props.cars.dailyRate;
    this._props.totalRentalValue =
      partialTotalRentalValue + this._props.rentalFee;
    console.log('DailyRate', this._props.cars.dailyRate);
    console.log('Car', this._props.cars);
    console.log(
      `initialDateT: ${initialDateT}, finalDateT: ${finalDateT}, totalDays: ${totalDays}, totalRentalValue: ${this._props.totalRentalValue}`,
    );
    return this;
  }

  setOrderClosingDate(orderClosingDate?: Date): this {
    this._props.orderClosingDate = orderClosingDate;
    return this;
  }

  setLateFee(): this {
    if (this._props.orderClosingDate) {
      const initialDateT = new Date(this._props.finalDate).getTime();
      const finalDateT = new Date(this._props.orderClosingDate).getTime();
      const totalDays = Math.ceil(
        Math.abs(finalDateT - initialDateT) / (1000 * 60 * 60 * 24),
      );
      const lateFeeString = (
        totalDays *
        this._props.cars.dailyRate *
        2
      ).toFixed(2);

      this._props.lateFee = parseFloat(lateFeeString);

      return this;
    }

    this._props.lateFee = 0;
    return this;
  }

  setStatus(status?: OrdersStatusEnum): this {
    this._props.status = status;
    return this;
  }

  async build(): Promise<Order> {
    await this.validateRequiredFields();
    const order = new Order(this._props as OrderProps, this._id);
    return order;
  }

  private async validateRequiredFields(): Promise<void> {
    const date = new Date();
    const zeroDate = new Date(
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    );

    if (!this._props.initialDate) {
      throw new Error('Order initial date is required');
    }
    if (!this._props.finalDate) {
      throw new Error('Order final date is required');
    }

    if (!this._props.cars) {
      throw new Error('Order car id is required');
    }

    if (!this._props.clients) {
      throw new Error('Order client id is required');
    }
    if (
      !(new Date(this._props.initialDate) >= zeroDate) ||
      !(new Date(this._props.finalDate) >= zeroDate) ||
      !(new Date(this._props.finalDate) >= new Date(this._props.initialDate))
    ) {
      throw new InvalidDateException();
    }
  }
}
