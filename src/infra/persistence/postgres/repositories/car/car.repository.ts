import { ConflictException, Injectable } from '@nestjs/common';
import { CarRepository } from 'src/domain/interfaces/repositories/carRepository.interface';
import { CarSchema } from '../../entities/car.schema';
import { ItemsSchema } from '../../entities/items.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from '../../../../../domain/entities/cars.entity';
import { ListCarDto } from '../../../../../application/cars/dto/list-car.dto';
import { UpdateCarDto } from 'src/application/cars/dto/update-car.dto';

@Injectable()
export class CarRepositoryImpl implements CarRepository {
  constructor(
    @InjectRepository(CarSchema)
    private readonly carSchema: Repository<CarSchema>,
    @InjectRepository(ItemsSchema)
    private readonly itemsSchema: Repository<ItemsSchema>,
  ) {}

  findByPlate(findByPlate: string) {
    return this.carSchema.findOne({ where: { plate: findByPlate } });
  }

  findByPlateAndActive(findByPlate: string) {
    return this.carSchema.findOne({
      where: { plate: findByPlate, status: true },
    });
  }

  delete(): void {
    throw new Error('Method not implemented.');
  }

  async list(filter: ListCarDto = {}): Promise<CarSchema[]> {
    const query = this.carSchema
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.items', 'items');

    if (filter.brand) {
      query.andWhere('car.brand LIKE :brand', { brand: `%${filter.brand}%` });
    }
    if (filter.km) {
      query.andWhere('car.km <= :km', { km: filter.km });
    }
    if (filter.year) {
      query.andWhere('car.year >= :year', { year: filter.year });
    }
    if (filter.status !== undefined) {
      query.andWhere('car.status = :status', { status: filter.status });
    }
    if (filter.dailyRate) {
      query.andWhere('car.dailyRate <= :dailyRate', {
        dailyRate: filter.dailyRate,
      });
    }

    const [cars] = await query
      .take(filter.limit)
      .skip((filter.page - 1) * filter.limit)
      .getManyAndCount();

    return cars;
  }

  async findId(id: string): Promise<CarSchema> {
    const car = this.carSchema.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!car) {
      return null;
    }
    return car;
  }

  async create(car: Cars): Promise<CarSchema> {
    const items = car.items.getItems().join(', ');
    const carSchema = new CarSchema();
    carSchema.plate = car.plate;
    carSchema.brand = car.brand;
    carSchema.model = car.model;
    carSchema.km = car.km;
    carSchema.dailyRate = car.dailyRate;
    carSchema.year = car.year;
    await this.carSchema.save(carSchema);

    const itemSchema = new ItemsSchema();
    itemSchema.name = items;
    itemSchema.car = carSchema;
    await this.itemsSchema.save(itemSchema);

    return carSchema;
  }

  async disable(id: string): Promise<CarSchema> {
    const car = await this.findId(id);
    if (car.status === false) {
      throw new ConflictException('Car already deactivated');
    }
    car.status = false;
    return this.carSchema.save(car);
  }

  async update(id: string, dto: UpdateCarDto): Promise<CarSchema | null> {
    const car = await this.findId(id);
    if (!car) {
      return null;
    }
    if (dto.plate) car.plate = dto.plate;
    if (dto.brand) car.brand = dto.brand;
    if (dto.dailyRate) car.dailyRate = dto.dailyRate;
    if (dto.km) car.km = dto.km;
    if (dto.model) car.model = dto.model;
    if (dto.year) car.year = dto.year;
    const carSchema = await this.carSchema.save(car);

    if (dto.items) {
      const items = car.items.join(', ');
      const itemSchema = new ItemsSchema();
      itemSchema.name = items;
      itemSchema.car = carSchema;
      await this.itemsSchema.save(itemSchema);
    }

    return carSchema;
  }
}
