import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
//import { CarControllersModule } from '../src/presentation/cars/http/controllers/carControllers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { CarSchema } from '../src/infra/persistence/postgres/entities/car.schema';
import { ItemsSchema } from '../src/infra/persistence/postgres/entities/items.schema';
import { OrdersSchema } from '../src/infra/persistence/postgres/entities/orders.schema';
import { UserSchema } from '../src/infra/persistence/postgres/entities/user.schema';
import { ClientSchema } from '../src/infra/persistence/postgres/entities/client.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientController } from '../src/presentation/client/http/controllers/client.controller';
import { CreateClientUseCase } from '../src/application/client/use-cases/create-client.use-case';
import { UpdateClientUseCase } from '../src/application/client/use-cases/update-client.use-case';
import { ListClientUseCase } from '../src/application/client/use-cases/list-client.use-case';
import { DesactiveClientUseCase } from '../src/application/client/use-cases/desactive-client.use-case';
import { GetClientByIdUseCase } from '../src/application/client/use-cases/get-client-by-id.use-case.ts';
import { ClientMapper } from '../src/application/client/mapper/client.mapper';
import { ClientPersistenceFactory } from '../src/domain/factories/persistence/client-persistence.factory';


describe('ClientController (e2e)', () => {
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
              ClientSchema,
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
          ClientSchema,
          ItemsSchema,
          OrdersSchema,
          UserSchema,
          ClientSchema,
        ]),
        ClientControllersModule,
      ],
      providers: [
        ConfigService,
        CreateClientUseCase,
        UpdateClientUseCase,
        ListClientUseCase,
        DesactiveClientUseCase,
        GetClientByIdUseCase,
        {
          provide: 'ClientRepository',
          useValue: {
            create: jest.fn().mockReturnValue({
              id: '1',
              email: 'aalmeida@outlook.com.br',
              name: 'Antonio Almeida',
              cpf: '550.813.410-70',
              tel: '99183-6754',
              dateOfBirth: '1992-01-23',
              status: true,
            }),
            save: jest.fn().mockReturnValue({
              id: '1',
              email: 'aalmeida@outlook.com.br',
              name: 'Antonio Almeida',
              cpf: '550.813.410-70',
              tel: '99183-6754',
              dateOfBirth: '1992-01-23',
              status: true,
            }),
            findId: jest.fn().mockReturnValue({
              email: 'aalmeida@outlook.com.br',
              name: 'Antonio Almeida',
              cpf: '550.813.410-70',
              tel: '99183-6754',
              dateOfBirth: '1992-01-23',
              status: true,
            }),
            findOne: jest.fn().mockReturnValue({
              email: 'aalmeida@outlook.com.br',
              name: 'Antonio Almeida',
              cpf: '550.813.410-70',
              tel: '99183-6754',
              dateOfBirth: '1992-01-23',
              status: true,
            }),
            update: jest.fn().mockReturnValue({
              email: 'update-aalmeida@outlook.com.br',
              name: 'update-Antonio Almeida',
              cpf: '550.813.410-70',
              tel: '99183-6754',
              dateOfBirth: '1992-01-23',
              status: true,
            }),
            delete: jest.fn(),
            findByEmail: jest.fn().mockReturnValue({
              email: 'update-aalmeida@outlook.com.br',
              name: 'update-Antonio Almeida',
              cpf: '550.813.410-70',
              tel: '99183-6754',
              dateOfBirth: '1992-01-23',
              status: true,,
            }),
            list: jest.fn(),
            disable: jest.fn().mockReturnValue({
              email: 'update-aalmeida@outlook.com.br',
              name: 'update-Antonio Almeida',
              cpf: '550.813.410-70',
              tel: '99183-6754',
              dateOfBirth: '1992-01-23',
              status: true,,
            }),
            findByPlateAndActive: jest.fn(),
          },
        },
        {
          provide: ClientMapper,
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
          provide: ClientPersistenceFactory,
          useValue: {
            create: jest.fn(),
            configureSchema: jest.fn(),
          },
        },
      ],
      controllers: [ClientController],
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

  it('POST /client - should create a client successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/client')
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

  it('POST /client - should fail with invalid plate', async () => {
    const response = await request(app.getHttpServer())
      .post('/client')
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

  it('GET /Client - should return a paginated list of clients', async () => {
    const response = await request(app.getHttpServer())
      .get('/client')
      .query({ page: 1, limit: 10 })
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /client/:id - should return client details', async () => {
    const clientId = '1';
    const response = await request(app.getHttpServer())
      .get(`/client/${clientId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', clientId);
    expect(response.body).toHaveProperty('items');
    expect(response.body).toHaveProperty('brand');
    expect(response.body).toHaveProperty('model');
    expect(response.body).toHaveProperty('plate');
    expect(response.body).toHaveProperty('year');
    expect(response.body).toHaveProperty('km');
    expect(response.body).toHaveProperty('dailyRate');
    expect(response.body).toHaveProperty('status');
  });

  it.only('PATCH /client/:id - should edit a client successfully', async () => {
    const clientId = '1';
    const response = await request(app.getHttpServer())
      .patch(`/client/${clientId}`)
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

  it('PATCH /client/:id/desactive - should inactivate a client', async () => {
    const clientId = '1';

    const response = await request(app.getHttpServer())
      .patch(`/client/${clientId}/desactive`)
      .expect(200);

    expect(response.body).toHaveProperty('status', false);
    expect(response.status).toBe(200);
  });
});
//# Para rodar os testes com o banco de dados de teste
// NODE_ENV=test npm run test
