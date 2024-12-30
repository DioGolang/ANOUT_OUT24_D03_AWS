import { Module } from '@nestjs/common';
import { ClientDomainService } from './client-domain.service';
import { ClientRepositoryModule } from '../../../infra/persistence/postgres/repositories/client/client-repository.module';

@Module({
  imports: [ClientRepositoryModule],
  providers: [ClientDomainService],
  exports: [ClientDomainService],
})
export class ClientDomainServiceModule {}
