import { Inject, Injectable } from '@nestjs/common';
import { CarMapper } from '../mapper/car.mapper';
import { CarRepository } from '../../../domain/interfaces/repositories/carRepository.interface';

@Injectable()
export class DesactiveCarUseCase {
  constructor(
    @Inject('CarRepository')
    private readonly carRepository: CarRepository,
    private readonly carMapper: CarMapper,
  ) {}

  async execute(id: string) {
    const schema = await this.carRepository.disable(id);
    return this.carMapper.schemaToDto(schema);
  }
}
