import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserSchema } from '../persistence/postgres/entities/user.schema';
import { ClientSchema } from '../persistence/postgres/entities/client.schema';
import { CarSchema } from '../persistence/postgres/entities/car.schema';
import { ItemsSchema } from '../persistence/postgres/entities/items.schema';
import { OrdersSchema } from '../persistence/postgres/entities/orders.schema';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST', 'localhost'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  entities: [UserSchema, ClientSchema, CarSchema, ItemsSchema, OrdersSchema],
  synchronize: true,
  logging: true,
});

export const typeOrmTestConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST_TEST', 'localhost'),
  username: configService.get<string>('POSTGRES_USER_TEST'),
  password: configService.get<string>('POSTGRES_PASSWORD_TEST'),
  database: configService.get<string>('POSTGRES_DB_TEST'),
  entities: [UserSchema, ClientSchema, CarSchema, ItemsSchema, OrdersSchema],
  synchronize: true,
  logging: true,
});
