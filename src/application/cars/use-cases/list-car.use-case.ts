import { Inject, Injectable } from '@nestjs/common';
import { CarRepository } from '../../../domain/interfaces/repositories/carRepository.interface';
import { CarMapper } from '../mapper/car.mapper';
import { CreateCarResponseDto } from '../dto/create-car-response.dto';
import { ListCarDto } from '../dto/list-car.dto';

@Injectable()
export class ListCarUseCase {
  constructor(
    @Inject('CarRepository')
    private readonly carRepository: CarRepository,
    private readonly carMapper: CarMapper,
  ) {}

  async execute(
    filter: Partial<ListCarDto> = {},
  ): Promise<CreateCarResponseDto[]> {
    const validatedFilter = Object.assign(new ListCarDto(), filter);
    const cars = await this.carRepository.list(validatedFilter);
    console.log(cars);
    return this.carMapper.toDomainList(cars);
  }
}
