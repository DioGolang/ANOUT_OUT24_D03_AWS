import { CreateClientUseCase } from './create-client.use-case';
import { DesactiveClientUseCase } from './desactive-client.use-case';
import { GetClientByIdUseCase } from './get-client-by-id.use-case.ts';
import { ListClientUseCase } from './list-client.use-case';
import { UpdateClientUseCase } from './update-client.use-case';

export const useCase = [
  CreateClientUseCase,
  ListClientUseCase,
  UpdateClientUseCase,
  DesactiveClientUseCase,
  GetClientByIdUseCase,
];
