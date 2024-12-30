import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { CarControllersModule } from '../src/presentation/cars/http/controllers/carControllers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarSchema } from '../src/infra/persistence/postgres/entities/car.schema';
import { ItemsSchema } from '../src/infra/persistence/postgres/entities/items.schema';
import { OrdersSchema } from '../src/infra/persistence/postgres/entities/orders.schema';
import { UserSchema } from '../src/infra/persistence/postgres/entities/user.schema';
import { ClientSchema } from '../src/infra/persistence/postgres/entities/client.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CarController } from '../src/presentation/cars/http/controllers/car.controller';
import { CreateCarUseCase } from '../src/application/cars/use-cases/create-car.use-case';
import { UpdateCarUseCase } from '../src/application/cars/use-cases/update-car.use-case';
import { ListCarUseCase } from '../src/application/cars/use-cases/list-car.use-case';
import { DesactiveCarUseCase } from '../src/application/cars/use-cases/desactive-car.use-case';
import { GetCarByIdUseCase } from '../src/application/cars/use-cases/get-car-by-id.use-case.ts';
import { CarMapper } from '../src/application/cars/mapper/car.mapper';
import { CarPersistenceFactory } from '../src/domain/factories/persistence/car-persistence.factory';

describe('CarController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        await ConfigModule.forRoot({
          isGlobal: true,
        }),

        TypeOrmModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('POSTGRES_HOST_TEST', 'localhost'),
            port: 5433,
            username: configService.get<string>('POSTGRES_USER_TEST'),
            password: configService.get<string>('POSTGRES_PASSWORD_TEST'),
            database: configService.get<string>('POSTGRES_DB_TEST'),
            entities: [
              CarSchema,
              ItemsSchema,
              OrdersSchema,
              UserSchema,
              ClientSchema,
            ],
            synchronize: true,
            logging: true,
          }),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([
          CarSchema,
          ItemsSchema,
          OrdersSchema,
          UserSchema,
          ClientSchema,
        ]),
        CarControllersModule,
      ],
      providers: [
        ConfigService,
        CreateCarUseCase,
        UpdateCarUseCase,
        ListCarUseCase,
        DesactiveCarUseCase,
        GetCarByIdUseCase,
        {
          provide: 'CarRepository',
          useValue: {
            create: jest.fn().mockReturnValue({
              id: '1',
              brand: 'Volkswagen',
              model: 'Fusca',
              plate: 'ABC-1D23',
              year: new Date().getFullYear() - 1,
              km: 3,
              dailyRate: 150,
              status: true,
              items: ['Air Conditioning', 'Leather Seats'],
            }),
            save: jest.fn().mockReturnValue({
              id: '1',
              brand: 'Volkswagen',
              model: 'Fusca',
              plate: 'ABC-1D23',
              year: new Date().getFullYear() - 1,
              km: 3,
              dailyRate: 150,
              status: true,
              items: ['Air Conditioning', 'Leather Seats'],
            }),
            findId: jest.fn().mockReturnValue({
              brand: 'Volkswagen',
              model: 'Fusca',
              plate: 'ABC-1D23',
              year: new Date().getFullYear() - 1,
              km: 3,
              dailyRate: 150,
              status: true,
              items: ['Air Conditioning', 'Leather Seats'],
            }),
            findOne: jest.fn().mockReturnValue({
              brand: 'Volkswagen',
              model: 'Fusca',
              plate: 'ABC-1D23',
              year: new Date().getFullYear() - 1,
              km: 3,
              dailyRate: 150,
              status: true,
              items: ['Air Conditioning', 'Leather Seats'],
            }),
            update: jest.fn().mockReturnValue({
              brand: 'Updated Brand',
              model: 'Updated Model',
              plate: 'ABC-1D23',
              year: new Date().getFullYear() - 1,
              km: 3,
              dailyRate: 150,
              status: true,
              items: ['Air Conditioning', 'Leather Seats'],
            }),
            delete: jest.fn(),
            findByPlate: jest.fn().mockReturnValue({
              brand: 'Volkswagen',
              model: 'Fusca',
              plate: 'ABC-1D23',
              year: new Date().getFullYear() - 1,
              km: 3,
              dailyRate: 150,
              status: true,
              items: ['Air Conditioning', 'Leather Seats'],
            }),
            list: jest.fn(),
            disable: jest.fn().mockReturnValue({
              brand: 'Volkswagen',
              model: 'Fusca',
              plate: 'ABC-1D23',
              year: new Date().getFullYear() - 1,
              km: 3,
              dailyRate: 150,
              status: false,
              items: ['Air Conditioning', 'Leather Seats'],
            }),
            findByPlateAndActive: jest.fn(),
          },
        },
        {
          provide: CarMapper,
          useValue: {
            schemaToDto: jest.fn().mockReturnValue({
              id: '1',
              brand: 'Volkswagen',
              model: 'Fusca',
              plate: 'ABC-1D23',
              year: 2023,
              km: 3,
              dailyRate: 150,
              status: true,
              items: ['Air Conditioning', 'Leather Seats'],
            }),
            dtoToSchema: jest.fn().mockReturnValue({
              brand: 'Volkswagen',
              model: 'Fusca',
              plate: 'ABC-1D23',
              year: 2023,
              km: 3,
              dailyRate: 150,
              status: true,
              items: ['Air Conditioning', 'Leather Seats'],
            }),
            dtoToDomain: jest.fn().mockReturnValue({
              id: '1',
              brand: 'Volkswagen',
              model: 'Fusca',
              plate: 'ABC-1D23',
              year: 2023,
              km: 3,
              dailyRate: 150,
              items: ['Air Conditioning', 'Leather Seats'],
              status: true,
            }),
            toDomainList: jest.fn().mockReturnValue([
              {
                id: '1',
                brand: 'Volkswagen',
                model: 'Fusca',
                plate: 'ABC-1D23',
                year: 2023,
                km: 3,
                dailyRate: 150,
                items: ['Air Conditioning', 'Leather Seats'],
                status: true,
              },
            ]),
            schemaToDomain: jest.fn().mockReturnValue({
              id: '1',
              brand: 'Volkswagen',
              model: 'Fusca',
              plate: 'ABC-1D23',
              year: 2023,
              km: 3,
              dailyRate: 150,
              items: ['Air Conditioning', 'Leather Seats'],
              status: true,
            }),
          },
        },
        {
          provide: CarPersistenceFactory,
          useValue: {
            create: jest.fn(),
            configureSchema: jest.fn(),
          },
        },
      ],
      controllers: [CarController],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /car - should create a car successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/cars')
      .send({
        brand: 'Volkswagen',
        model: 'Fusca',
        plate: 'ABC-1D23',
        year: new Date().getFullYear() - 1,
        km: 3,
        dailyRate: 150,
        items: ['Air Conditioning', 'Leather Seats'],
      })
      .expect(201);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('brand', 'Volkswagen');
    expect(response.body).toHaveProperty('model', 'Fusca');
    expect(response.body).toHaveProperty('plate', 'ABC-1D23');
    expect(response.body).toHaveProperty('year', new Date().getFullYear() - 1);
    expect(response.body).toHaveProperty('km', 3);
    expect(response.body.status).toBe(true);
  });

  it('POST /car - should fail with invalid plate', async () => {
    const response = await request(app.getHttpServer())
      .post('/cars')
      .send({
        brand: 'Volkswagen',
        model: 'Fusca',
        plate: 'INVALID',
        year: new Date().getFullYear() - 1,
        km: 3,
        dailyRate: 150,
        items: ['Air Conditioning', 'Leather Seats'],
      })
      .expect(400);
    expect(response.body.message).toEqual(['Invalid Plate']);
    expect(response.body.statusCode).toEqual(400);
  });

  it('GET /car - should return a paginated list of cars', async () => {
    const response = await request(app.getHttpServer())
      .get('/cars')
      .query({ page: 1, limit: 10 })
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /car/:id - should return car details', async () => {
    const carId = '1';
    const response = await request(app.getHttpServer())
      .get(`/cars/${carId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', carId);
    expect(response.body).toHaveProperty('items');
    expect(response.body).toHaveProperty('brand');
    expect(response.body).toHaveProperty('model');
    expect(response.body).toHaveProperty('plate');
    expect(response.body).toHaveProperty('year');
    expect(response.body).toHaveProperty('km');
    expect(response.body).toHaveProperty('dailyRate');
    expect(response.body).toHaveProperty('status');
  });

  it.only('PATCH /car/:id - should edit a car successfully', async () => {
    const carId = '1';
    const response = await request(app.getHttpServer())
      .patch(`/cars/${carId}`)
      .send({
        brand: 'Updated Brand',
        model: 'Updated Model',
      })
      .expect(200);

    console.log(response.body);

    expect(response.body).toHaveProperty('brand', 'Updated Brand');
    expect(response.body).toHaveProperty('model', 'Updated Model');
    expect(response.status).toBe(200);
  });

  it('PATCH /car/:id/desactive - should inactivate a car', async () => {
    const carId = '1';

    const response = await request(app.getHttpServer())
      .patch(`/cars/${carId}/desactive`)
      .expect(200);

    expect(response.body).toHaveProperty('status', false);
    expect(response.status).toBe(200);
  });
});
//# Para rodar os testes com o banco de dados de teste
// NODE_ENV=test npm run test
