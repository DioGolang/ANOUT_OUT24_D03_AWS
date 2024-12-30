import { DisableUserUseCase } from './disable-user.use-case';
import { CreateUserUseCase } from './create-user.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { UpdateUserUseCase } from './update-user.use-case';
import { ListUserUseCase } from './list-user.use-case';
import { EnableUserUseCase } from './enable-user.use-case';

export const UserCases = [
  CreateUserUseCase,
  GetUserByIdUseCase,
  DisableUserUseCase,
  UpdateUserUseCase,
  ListUserUseCase,
  EnableUserUseCase,
];
