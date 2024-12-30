import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './user/user-repository.module';
import { CarRepositoryModule } from './car/car-repository.module';
import { OrderRepositoryModule } from './order/order-repoository.module';

@Module({
  imports: [UserRepositoryModule, CarRepositoryModule, OrderRepositoryModule],
})
export class RepositoriesModule {}
