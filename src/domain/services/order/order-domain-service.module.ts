import { Module } from '@nestjs/common';
import { OrderDomainService } from './order-domain.service';
import { OrderRepositoryModule } from '../../../infra/persistence/postgres/repositories/order/order-repoository.module';

@Module({
  imports: [OrderRepositoryModule],
  providers: [OrderDomainService],
  exports: [OrderDomainService],
})
export class OrderDomainServiceModule {}
