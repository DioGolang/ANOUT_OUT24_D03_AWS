import { Injectable } from '@nestjs/common';
import { CarSchema } from '../../../infra/persistence/postgres/entities/car.schema';
import { PersistenceFactory } from './persistence-factory';
import { CreateCarDto } from '../../../application/cars/dto/create-cars.dto';

@Injectable()
export class CarPersistenceFactory
  implements PersistenceFactory<CarSchema, CreateCarDto>
{
  createSchema() {
    return new CarSchema();
  }
  async configureSchema(
    schema: CarSchema,
    domain: CreateCarDto,
  ): Promise<CarSchema> {
    schema.brand = domain.brand;
    schema.model = domain.model;
    schema.year = domain.year;
    schema.dailyRate = domain.dailyRate;
    schema.km = domain.km;
    schema.plate = domain.plate;
    return schema;
  }
}
