import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderModule } from '../../../../application/orders/order.module';

@Module({
  imports: [OrderModule],
  controllers: [OrderController],
})
export class OrderControllersModule {}
