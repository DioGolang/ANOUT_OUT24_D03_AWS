import { Module } from '@nestjs/common';
import { useCase } from './use-cases';
import { BuildModule } from '../../domain/factories/build/build.module';
import { CarMapper } from './mapper/car.mapper';
import { PersistenceModule } from '../../domain/factories/persistence/persistence.module';
import { CarRepositoryModule } from '../../infra/persistence/postgres/repositories/car/car-repository.module';

@Module({
  imports: [PersistenceModule, CarRepositoryModule, BuildModule],
  providers: [CarMapper, ...useCase],
  exports: [CarMapper, ...useCase],
})
export class CarsModule {}
