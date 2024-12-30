import { Module } from '@nestjs/common';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';
import { UserPersistenceFactory } from './user-persistence.factory';
import { ClientPersistenceFactory } from './client-persistence.factory';
import { OrderPersistenceFactory } from './order-persistence.factory';
import { CarPersistenceFactory } from './car-persistence.factory';
import { CarRepositoryModule } from '../../../infra/persistence/postgres/repositories/car/car-repository.module';
import { ClientRepositoryModule } from '../../../infra/persistence/postgres/repositories/client/client-repository.module';

@Module({
  imports: [EncryptionModule, CarRepositoryModule, ClientRepositoryModule],
  providers: [
    {
      provide: 'UserPersistenceFactory',
      useClass: UserPersistenceFactory,
    },
    {
      provide: 'ClientPersistenceFactory',
      useClass: ClientPersistenceFactory,
    },
    {
      provide: 'OrderPersistenceFactory',
      useClass: OrderPersistenceFactory,
    },
    {
      provide: 'CarPersistenceFactory',
      useClass: CarPersistenceFactory,
    },
  ],
  exports: [
    'UserPersistenceFactory',
    'ClientPersistenceFactory',
    'OrderPersistenceFactory',
    'CarPersistenceFactory',
  ],
})
export class PersistenceModule {}
