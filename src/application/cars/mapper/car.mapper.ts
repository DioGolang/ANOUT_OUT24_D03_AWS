import { Mapper } from '../../interfaces/mapper.interface';
import { CarSchema } from '../../../infra/persistence/postgres/entities/car.schema';
import { CreateCarDto } from '../dto/create-cars.dto';
import { CreateCarResponseDto } from '../dto/create-car-response.dto';
import { Cars } from '../../../domain/entities/cars.entity';
import { PersistenceFactory } from '../../../domain/factories/persistence/persistence-factory';
import { Inject } from '@nestjs/common';
import { CarBuilder } from '../../../domain/builds/car.builder';
import { plainToClass } from 'class-transformer';
import { CarBuilderFactoryInterface } from '../../../domain/factories/build/car-build.factory.interface';

export class CarMapper
  implements Mapper<CarSchema, CreateCarDto, CreateCarResponseDto>
{
  constructor(
    @Inject('CarPersistenceFactory')
    private readonly carPersistenceFactory: PersistenceFactory<
      CarSchema,
      CreateCarDto
    >,
    @Inject('CarBuildFactory')
    private readonly carBuildFactory: CarBuilderFactoryInterface,
  ) {}

  async schemaToDto(schema: CarSchema): Promise<CreateCarResponseDto> {
    return plainToClass(CreateCarResponseDto, schema, {
      excludeExtraneousValues: true,
    });
  }
  dtoToSchema(dto: CreateCarDto): Promise<CarSchema> {
    throw new Error('Method not implemented.');
  }

  async dtoToDomain(dto: CreateCarDto): Promise<Cars> {
    const carBuilder = await this.carBuildFactory.createBuilder();
    await this.carBuildFactory.configureBuilder(carBuilder, dto);
    return carBuilder.build();
  }

  async toDomainList(schemas: CarSchema[]): Promise<CreateCarResponseDto[]> {
    const cars = [];
    for (const schema of schemas) {
      cars.push(await this.schemaToDto(schema));
    }
    return cars;
  }

  async schemaToDomain(car: CarSchema): Promise<Cars> {
    const build = new CarBuilder();
    build.setBrand(car.brand);
    build.setDailyRate(car.dailyRate);
    build.setId(car.id);
    build.setKm(car.km);
    build.setModel(car.model);
    build.setPlate(car.plate);
    build.setStatus(car.status);
    build.setYear(car.year);
    return build.build();
  }
}
