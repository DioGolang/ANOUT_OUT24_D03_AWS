import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientSchema } from '../../entities/client.schema';
import { ClientRepositoryImpl } from './client.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientSchema])],
  providers: [
    {
      provide: 'ClientRepository',
      useClass: ClientRepositoryImpl,
    },
  ],
  exports: ['ClientRepository'],
})
export class ClientRepositoryModule {}
