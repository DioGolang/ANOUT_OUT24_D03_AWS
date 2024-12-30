import { Module } from '@nestjs/common';
import { UserControllersModule } from './user/http/controllers/userControllersModule';
import { ClientControllersModule } from './client/http/controllers/clientControllersModule';
import { AuthControllersModule } from './auth/http/controllers/auth-controllers.module';
import { OrderControllersModule } from './order/http/controllers/orderControllersModule';
import { CarControllersModule } from './cars/http/controllers/carControllers.module';



@Module({
  imports: [
    UserControllersModule,
    ClientControllersModule,
    AuthControllersModule,
    OrderControllersModule,
    CarControllersModule,


  ],

})
export class PresentationModule {}
