import { CarProps } from '../interfaces/props/car-props.interface';
import { Cars } from '../entities/cars.entity';
import { Items } from '../entities/items.entity';
import { Plate } from '../value-objects/plate.vo';

export class CarBuilder {
  private _id?: string;
  private _props: Partial<CarProps> = {};
  private _items: Items;

  setId(id: string): this {
    this._id = id;
    return this;
  }

  setBrand(brand: string): this {
    this._props.brand = brand;
    return this;
  }

  setModel(model: string): this {
    this._props.model = model;
    return this;
  }

  setPlate(plate: string): this {
    this._props.plate = new Plate(plate);
    return this;
  }

  setYear(year: number): this {
    this._props.year = year;
    return this;
  }

  setKm(km: number): this {
    this._props.km = km;
    return this;
  }

  setItems(items: string[]): this {
    this._items = new Items(items);
    return this;
  }

  setDailyRate(dailyRate: number): this {
    this._props.dailyRate = dailyRate;
    return this;
  }

  setStatus(status?: boolean): this {
    this._props.status = status;
    return this;
  }

  build(): Cars {
    // this.validateRequiredFields();
    const car = new Cars(this._props as CarProps, this._items, this._id);
    return car;
  }

  // private validateRequiredFields(): void {
  //   if (!this._id) {
  //     throw new Error('Car id is required');
  //   }
  //   if (!this._props.marca) {
  //     throw new Error('Car marca is required');
  //   }
  //   if (!this._props.model) {
  //     throw new Error('Car model is required');
  //   }
  //
  //   if (!this._props.plate) {
  //     throw new Error('Car plate is required');
  //   }
  //
  //   if (!this._props.year) {
  //     throw new Error('Car year is required');
  //   }
  //
  //   if (!this._props.km) {
  //     throw new Error('Car km is required');
  //   }
  //
  //   if (!this._props.dailyRate) {
  //     throw new Error('Car dailyRate is required');
  //   }
  // }
}
