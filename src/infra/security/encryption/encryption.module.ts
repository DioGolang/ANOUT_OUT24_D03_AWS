import { Module } from '@nestjs/common';
import { BcryptPasswordImpl } from './bcrypt-password.service';

@Module({
  providers: [
    {
      provide: 'Crypt',
      useClass: BcryptPasswordImpl,
    },
  ],
  exports: ['Crypt'],
})
export class EncryptionModule {}
