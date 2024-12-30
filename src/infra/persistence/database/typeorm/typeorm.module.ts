import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {
  typeOrmConfig,
  typeOrmTestConfig,
} from '../../../config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        if (process.env.NODE_ENV === 'test') {
          return typeOrmTestConfig(configService);
        }
        return typeOrmConfig(configService);
      },
      inject: [ConfigService],
    }),
  ],
})
export class TypeormModule {}
