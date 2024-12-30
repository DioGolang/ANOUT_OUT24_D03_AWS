import { Module } from '@nestjs/common';
import { PostalCodeService } from './postal-code.service';

@Module({
  providers: [
    {
      provide: 'PostalCodeViaCep',
      useClass: PostalCodeService,
    },
  ],
  exports: ['PostalCodeViaCep'],
})
export class PostalCodeModule {}
