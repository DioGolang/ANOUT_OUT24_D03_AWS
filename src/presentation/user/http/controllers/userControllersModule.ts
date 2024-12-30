import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserModule } from '../../../../application/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserController],
})
export class UserControllersModule {}
