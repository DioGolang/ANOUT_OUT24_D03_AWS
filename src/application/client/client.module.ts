import { Module } from '@nestjs/common';
import { useCase } from './use-cases';
import { PersistenceModule } from '../../domain/factories/persistence/persistence.module';
import { BuildModule } from '../../domain/factories/build/build.module';
import { ClientMapper } from './mapper/client.mapper';
import { ClientRepositoryModule } from '../../infra/persistence/postgres/repositories/client/client-repository.module';

@Module({
  imports: [PersistenceModule, ClientRepositoryModule, BuildModule],
  providers: [ClientMapper, ...useCase],
  exports: [ClientMapper, ...useCase],
})
export class ClientModule {}
