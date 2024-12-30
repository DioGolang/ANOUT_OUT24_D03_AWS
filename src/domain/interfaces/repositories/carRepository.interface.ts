import { CarSchema } from 'src/infra/persistence/postgres/entities/car.schema';
import { Repository } from './repository.interface';
import { Cars } from '../../entities/cars.entity';
import { ListCarDto } from '../../../application/cars/dto/list-car.dto';
import { UpdateCarDto } from 'src/application/cars/dto/update-car.dto';

export interface CarRepository
  extends Repository<Cars, CarSchema, UpdateCarDto> {
  findByPlate(findByPlate: string): Promise<CarSchema>;
  list(filter: ListCarDto): Promise<CarSchema[]>;
  disable(id: string): Promise<CarSchema>;
  findByPlateAndActive(findByPlate: string): Promise<CarSchema>;
}
