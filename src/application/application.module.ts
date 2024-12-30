import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ValidatorsModule } from './shared/validators/validators.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './orders/order.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    UserModule,
    ValidatorsModule,
    AuthModule,
    ClientModule,
    OrderModule,
    CarsModule,
  ],
})
export class ApplicationModule {}
