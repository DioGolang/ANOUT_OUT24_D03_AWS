import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { OrderRepositoryModule } from '../../infra/persistence/postgres/repositories/order/order-repoository.module';
import { PersistenceModule } from '../../domain/factories/persistence/persistence.module';
import { OrderMapper } from './mapper/order.mapper';
import { OrderDomainServiceModule } from '../../domain/services/order/order-domain-service.module';
import { CarRepositoryModule } from '../../infra/persistence/postgres/repositories/car/car-repository.module';
import { ClientRepositoryModule } from '../../infra/persistence/postgres/repositories/client/client-repository.module';
import { BuildModule } from '../../domain/factories/build/build.module';
import { CarsModule } from '../cars/cars.module';
import { ClientModule } from '../client/client.module';
import { PostalCodeModule } from '../../infra/services/postal-code/postal-code.module';
import { UpdateOrderUseCase } from './use-cases/update-order.use-case';
import { GetOrderByIdUseCase } from './use-cases/get-order-by-id.use-case';
import { InactivateOrderUseCase } from './use-cases/inactive-order.use-case';
import { ListOrderDto } from './dto/list-order.dto';
import { ListOrderUseCase } from './use-cases/list-order.use-case';

@Module({
  imports: [
    OrderDomainServiceModule,
    OrderRepositoryModule,
    PersistenceModule,
    CarRepositoryModule,
    ClientRepositoryModule,
    BuildModule,
    CarsModule,
    ClientModule,
    PostalCodeModule,
  ],
  providers: [
    OrderMapper,
    CreateOrderUseCase,
    UpdateOrderUseCase,
    GetOrderByIdUseCase,
    InactivateOrderUseCase,
    ListOrderUseCase,
  ],
  exports: [
    OrderMapper,
    CreateOrderUseCase,
    UpdateOrderUseCase,
    GetOrderByIdUseCase,
    InactivateOrderUseCase,
    ListOrderUseCase,
  ],
})
export class OrderModule {}
