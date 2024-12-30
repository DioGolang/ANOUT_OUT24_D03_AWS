import { Items } from './items.entity';
import { CarProps } from '../interfaces/props/car-props.interface';
import { InvalidCarException } from '../exceptions/invalid-car.exception';
import { ConflictException } from '@nestjs/common';
import { UpdateCarDto } from '../../application/cars/dto/update-car.dto';
import { Plate } from '../value-objects/plate.vo';

export class Cars {
  private readonly _id?: string;
  private readonly _props: CarProps;
  private _items: Items;
  constructor(props: CarProps, items: Items, id?: string) {
    this.validateKm(props.km);
    this.validateYear(props.year);
    this.validateDailyRate(props.dailyRate);
    this._id = id;
    this._props = props;
    this._items = items;
  }

  private validateKm(km: number): void {
    if (km < 0) {
      throw new InvalidCarException('Invalid Km');
    }
  }

  private validateYear(year: number): void {
    const currentYear = new Date().getFullYear();

    if (year < currentYear - 10) {
      throw new Error('Invalid Year');
    }
  }

  private validateDailyRate(dailyRate: number): void {
    if (dailyRate < 0) {
      throw new InvalidCarException('daily rate less than 0');
    }
  }

  addItem(item: string): void {
    if (this._items.contains(item)) {
      throw new InvalidCarException('Duplicate Items');
    }
    this._items = new Items([...this._items.toString().split(', '), item]);
  }

  removeItem(item: string): void {
    this._items = new Items(
      this._items
        .toString()
        .split(', ')
        .filter((i) => i !== item),
    );
  }

  updateDetails(dto: UpdateCarDto): void {
    if (dto.brand && !dto.model) {
      throw new ConflictException('Model must be updated along with the brand');
    }
    if (dto.model && !dto.brand) {
      throw new ConflictException('Brand must be updated along with the model');
    }

    if (dto.brand) this._props.brand = dto.brand;
    if (dto.model) this._props.model = dto.model;
    if (dto.plate) this._props.plate = new Plate(dto.plate);
    if (dto.year) this.validateYear(dto.year);
    if (dto.km) this.validateKm(dto.km);
    if (dto.km !== undefined) this._props.km = dto.km;
    if (dto.dailyRate !== undefined) this._props.dailyRate = dto.dailyRate;
    if (dto.items) this._items = new Items(dto.items);
  }

  get id(): string {
    return this._id;
  }

  get brand(): string {
    return this._props.brand;
  }

  get model(): string {
    return this._props.model;
  }

  get plate(): string {
    return this._props.plate.toString();
  }

  get year(): number {
    return this._props.year;
  }

  get km(): number {
    return this._props.km;
  }

  get dailyRate(): number {
    return this._props.dailyRate;
  }

  get status(): boolean {
    return this._props.status;
  }

  get items(): Items {
    return this._items;
  }
}
