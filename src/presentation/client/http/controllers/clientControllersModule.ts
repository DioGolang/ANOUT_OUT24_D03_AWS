import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientModule } from '../../../../application/client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [ClientController],
})
export class ClientControllersModule {}
