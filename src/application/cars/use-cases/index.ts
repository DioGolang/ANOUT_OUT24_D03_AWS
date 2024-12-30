import { CreateCarUseCase } from './create-car.use-case';
import { DesactiveCarUseCase } from './desactive-car.use-case';
import { GetCarByIdUseCase } from './get-car-by-id.use-case.ts';
import { ListCarUseCase } from './list-car.use-case';
import { UpdateCarUseCase } from './update-car.use-case';
import { FilterValidationUseCase } from './filter-validation.use-case';

export const useCase = [
  CreateCarUseCase,
  DesactiveCarUseCase,
  GetCarByIdUseCase,
  ListCarUseCase,
  UpdateCarUseCase,
  FilterValidationUseCase,
];
