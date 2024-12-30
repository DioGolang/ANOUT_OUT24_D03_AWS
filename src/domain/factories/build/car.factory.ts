import { Injectable } from '@nestjs/common';
import { CarBuilder } from '../../builds/car.builder';
import { BuilderFactory } from './builder.factory';

interface CarData {
  id: string;
  brand: string;
  model: string;
  plate: string;
  year: number;
  km: number;
  dailyRate: number;
  items: string[];
  status?: boolean;
}

@Injectable()
export class CarFactory extends BuilderFactory<CarBuilder> {
  createBuilder(): CarBuilder {
    return new CarBuilder();
  }

  async configureBuilder(
    builder: CarBuilder,
    data: CarData,
  ): Promise<CarBuilder> {
    return builder
      .setId(data.id)
      .setBrand(data.brand)
      .setModel(data.model)
      .setPlate(data.plate)
      .setYear(data.year)
      .setKm(data.km)
      .setDailyRate(data.dailyRate)
      .setItems(data.items)
      .setStatus(data.status);
  }
}
