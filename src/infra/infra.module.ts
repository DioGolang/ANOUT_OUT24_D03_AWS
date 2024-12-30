import { Module } from '@nestjs/common';
import { TypeormModule } from './persistence/database/typeorm/typeorm.module';
import { RepositoriesModule } from './persistence/postgres/repositories/repositories.module';
import { EncryptionModule } from './security/encryption/encryption.module';
import { ServicesModule } from './services/services.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [TypeormModule, RepositoriesModule, EncryptionModule, ServicesModule, SeedModule]
})
export class InfraModule {}
