import { Module } from '@nestjs/common';
import { CarRepositoryImpl } from './car.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarSchema } from '../../entities/car.schema';
import { ItemsSchema } from '../../entities/items.schema';

@Module({
  imports: [TypeOrmModule.forFeature([CarSchema, ItemsSchema])],
  providers: [
    {
      provide: 'CarRepository',
      useClass: CarRepositoryImpl,
    },
  ],
  exports: ['CarRepository'],
})
export class CarRepositoryModule {}
