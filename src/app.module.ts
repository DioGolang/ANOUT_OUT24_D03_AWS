import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from './application/application.module';
import { InfraModule } from './infra/infra.module';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PresentationModule,
    ApplicationModule,
    InfraModule,
    DomainModule,
  ],
  providers: [AppService],
})
export class AppModule {}
