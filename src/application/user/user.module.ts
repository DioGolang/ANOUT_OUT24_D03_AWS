import { Module } from '@nestjs/common';
import { UserCases } from './use-cases';
import { UserRepositoryModule } from '../../infra/persistence/postgres/repositories/user/user-repository.module';
import { UserDomainServiceModule } from '../../domain/services/user/user-domain-service.module';
import { PersistenceModule } from '../../domain/factories/persistence/persistence.module';
import { UserMapper } from './mapper/user.mapper';
import { BuildModule } from '../../domain/factories/build/build.module';
import { EncryptionModule } from '../../infra/security/encryption/encryption.module';

@Module({
  imports: [
    UserDomainServiceModule,
    UserRepositoryModule,
    PersistenceModule,
    BuildModule,
    EncryptionModule,
  ],
  providers: [UserMapper, ...UserCases],
  exports: [UserMapper, ...UserCases],
})
export class UserModule {}
