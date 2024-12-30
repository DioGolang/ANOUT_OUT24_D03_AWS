import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarsModule } from '../../../../application/cars/cars.module';

@Module({
  imports: [CarsModule],
  controllers: [CarController],
})
export class CarControllersModule {}
