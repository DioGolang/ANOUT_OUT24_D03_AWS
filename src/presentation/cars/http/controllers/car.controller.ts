import {
  Body,
  Controller,
  Param,
  Post,
  Patch,
  Query,
  Get,
  UseFilters,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { InvalidCarExceptionFilter } from '../filters/invalid-car-exception.filter';
import { NotFoundCarExceptionFilter } from '../filters/not-found-car-exception.filter';
import { CreateCarUseCase } from '../../../../application/cars/use-cases/create-car.use-case';
import { UpdateCarUseCase } from '../../../../application/cars/use-cases/update-car.use-case';
import { ListCarUseCase } from '../../../../application/cars/use-cases/list-car.use-case';
import { DesactiveCarUseCase } from '../../../../application/cars/use-cases/desactive-car.use-case';
import { GetCarByIdUseCase } from '../../../../application/cars/use-cases/get-car-by-id.use-case.ts';
import { CreateCarDto } from '../../../../application/cars/dto/create-cars.dto';
import { UpdateCarDto } from '../../../../application/cars/dto/update-car.dto';
import { ListCarDto } from '../../../../application/cars/dto/list-car.dto';
import { JwtAuthGuard } from '../../../../application/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCarResponseDto } from '../../../../application/cars/dto/create-car-response.dto';

@ApiTags('Cars')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@UseFilters(InvalidCarExceptionFilter, NotFoundCarExceptionFilter)
@Controller('cars')
export class CarController {
  constructor(
    private readonly createCarUseCase: CreateCarUseCase,
    private readonly updateCarUseCase: UpdateCarUseCase,
    private readonly listCarUseCase: ListCarUseCase,
    private readonly desactiveCarUseCase: DesactiveCarUseCase,
    private readonly getCarByIdUseCase: GetCarByIdUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a car.' })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: CreateCarResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Validation error.' })
  @ApiResponse({ status: 409, description: 'Car already exists.' })
  @Post()
  async createCar(@Body() createCarDto: CreateCarDto) {
    return this.createCarUseCase.execute(createCarDto);
  }

  @ApiOperation({ summary: 'Update a car.' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CreateCarResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 409, description: 'Plate already exists' })
  @Patch(':id')
  async updateCar(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.updateCarUseCase.execute(id, updateCarDto);
  }

  @ApiOperation({ summary: 'Inactivate car by id.' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CreateCarResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 409, description: 'Car already deactivated' })
  @Patch(':id/desactive')
  async desactiveCar(@Param('id') id: string) {
    return this.desactiveCarUseCase.execute(id);
  }

  @ApiOperation({ summary: 'List cars.' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CreateCarResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  async listCars(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    filter: ListCarDto,
  ) {
    return this.listCarUseCase.execute(filter);
  }

  @ApiOperation({ summary: 'Find a car by id.' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CreateCarResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':id')
  async getCarById(@Param('id') id: string) {
    return this.getCarByIdUseCase.execute(id);
  }
}
