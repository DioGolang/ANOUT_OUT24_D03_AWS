import { Module } from '@nestjs/common';
import { OrderRepositoryImpl } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersSchema } from '../../entities/orders.schema';
import { CarRepositoryModule } from '../car/car-repository.module';
import { ClientRepositoryModule } from '../client/client-repository.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersSchema]),
    CarRepositoryModule,
    ClientRepositoryModule,
  ],
  providers: [
    {
      provide: 'OrderRepository',
      useClass: OrderRepositoryImpl,
    },
  ],
  exports: ['OrderRepository'],
})
export class OrderRepositoryModule {}
