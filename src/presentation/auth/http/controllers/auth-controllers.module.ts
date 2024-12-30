import { Module } from '@nestjs/common';
import { AuthControllersController } from './auth-controllers.controller';
import { AuthModule } from '../../../../application/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AuthControllersController],
})
export class AuthControllersModule {}
