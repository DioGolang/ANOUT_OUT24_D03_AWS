import { Inject, Injectable } from '@nestjs/common';
import { CarRepository } from 'src/domain/interfaces/repositories/carRepository.interface';
import { CarMapper } from '../mapper/car.mapper';
import { NotFoundCarException } from '../../../domain/exceptions/not-found-car';

Injectable();
export class GetCarByIdUseCase {
  constructor(
    @Inject('CarRepository')
    private readonly carRepository: CarRepository,
    private readonly carMapper: CarMapper,
  ) {}

  async execute(id: string) {
    const carExists = await this.carRepository.findId(id);
    if (!carExists) {
      throw new NotFoundCarException();
    }
    const schema = await this.carRepository.findId(id);
    return this.carMapper.schemaToDto(schema);
  }
}
