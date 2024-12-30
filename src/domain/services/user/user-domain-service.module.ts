import { Module } from '@nestjs/common';
import { UserDomainService } from './user-domain.service';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';
import { UserRepositoryModule } from '../../../infra/persistence/postgres/repositories/user/user-repository.module';

@Module({
  imports: [UserRepositoryModule, EncryptionModule],
  providers: [UserDomainService],
  exports: [UserDomainService],
})
export class UserDomainServiceModule {}
