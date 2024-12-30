import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { EncryptionModule } from '../security/encryption/encryption.module';
import { UserRepositoryModule } from '../persistence/postgres/repositories/user/user-repository.module';

@Module({
  imports: [EncryptionModule, UserRepositoryModule],
  providers: [SeedService],
})
export class SeedModule {}
