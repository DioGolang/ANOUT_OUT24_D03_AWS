import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../../infra/persistence/postgres/repositories/user/user-repository.module';

@Module({
  imports: [UserRepositoryModule],
  providers: [],
  exports: [],
})
export class ValidatorsModule {}
