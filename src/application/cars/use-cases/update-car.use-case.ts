import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CarMapper } from '../mapper/car.mapper';
import { CarRepository } from 'src/domain/interfaces/repositories/carRepository.interface';
import { UpdateCarDto } from '../dto/update-car.dto';
import { NotFoundCarException } from '../../../domain/exceptions/not-found-car';

@Injectable()
export class UpdateCarUseCase {
  constructor(
    @Inject('CarRepository')
    private readonly carRepository: CarRepository,
    private readonly carMapper: CarMapper,
  ) {}

  async execute(id: string, dto: UpdateCarDto) {
    const carExists = await this.carRepository.findId(id);
    if (!carExists) {
      throw new NotFoundCarException();
    }
    if (dto.plate) {
      const carExists = await this.carRepository.findByPlate(dto.plate);
      if (carExists) {
        throw new ConflictException('Car already exists');
      }
    }
    const car = await this.carMapper.schemaToDomain(carExists);
    car.updateDetails(dto);
    const schema = await this.carRepository.update(id, dto);
    return this.carMapper.schemaToDto(schema);
  }
}
