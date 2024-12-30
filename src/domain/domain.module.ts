import { Module } from '@nestjs/common';
import { PersistenceModule } from './factories/persistence/persistence.module';
import { UserDomainServiceModule } from './services/user/user-domain-service.module';
import { ClientDomainServiceModule } from './services/client/client-domain-service.module';
import { OrderDomainServiceModule } from './services/order/order-domain-service.module';
import { BuildModule } from './factories/build/build.module';

@Module({
  imports: [
    UserDomainServiceModule,
    ClientDomainServiceModule,
    PersistenceModule,
    OrderDomainServiceModule,
    BuildModule,
  ],
})
export class DomainModule {}
