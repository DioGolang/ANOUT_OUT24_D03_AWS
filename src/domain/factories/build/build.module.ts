import { Module } from '@nestjs/common';
import { UserFactory } from './user.factory';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';
import { CarFactory } from './car.factory';
import { OrderFactory } from './order.factory';
import { ClientFactory } from './client.factory';

@Module({
  imports: [EncryptionModule],
  providers: [
    {
      provide: 'UserBuildFactory',
      useClass: UserFactory,
    },
    {
      provide: 'CarBuildFactory',
      useClass: CarFactory,
    },
    {
      provide: 'OrderBuildFactory',
      useClass: OrderFactory,
    },
    {
      provide: 'ClientBuildFactory',
      useClass: ClientFactory,
    },
  ],
  exports: [
    'UserBuildFactory',
    'CarBuildFactory',
    'OrderBuildFactory',
    'ClientBuildFactory',
  ],
})
export class BuildModule {}
