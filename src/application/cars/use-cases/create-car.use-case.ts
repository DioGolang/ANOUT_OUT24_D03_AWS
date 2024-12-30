import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateCarDto } from '../dto/create-cars.dto';
import { CarRepository } from 'src/domain/interfaces/repositories/carRepository.interface';
import { CarMapper } from '../mapper/car.mapper';
import { CreateCarResponseDto } from '../dto/create-car-response.dto';

@Injectable()
export class CreateCarUseCase {
  constructor(
    @Inject('CarRepository')
    private readonly carRepository: CarRepository,
    private readonly carMapper: CarMapper,
  ) {}

  async execute(createCarDto: CreateCarDto): Promise<CreateCarResponseDto> {
    const carExists = await this.carRepository.findByPlateAndActive(
      createCarDto.plate,
    );
    if (carExists) {
      throw new ConflictException('Car already exists');
    }

    const cars = await this.carMapper.dtoToDomain(createCarDto);
    const schema = await this.carRepository.create(cars);
    return this.carMapper.schemaToDto(schema);
  }
}
//Api => controller => useCase => repositorio
