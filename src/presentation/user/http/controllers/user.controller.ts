import {
  Body,
  Controller,
  Param,
  Post,
  UseFilters,
  Get,
  Patch,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../../../application/user/use-cases/create-user.use-case';
import { CreateUserDto } from '../../../../application/user/dto/create-user.dto';
import { InvalidUserExceptionFilter } from '../filter/invalid-user-exception.filter';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserResponseDto } from '../../../../application/user/dto/create-user-response.dto';
import { UserAlreadyExistsExceptionFilter } from '../filter/user-already-exists-exception.filter';
import { GetUserByIdUseCase } from '../../../../application/user/use-cases/get-user-by-id.use-case';
import { DisableUserUseCase } from '../../../../application/user/use-cases/disable-user.use-case';
import { UpdateUserUseCase } from '../../../../application/user/use-cases/update-user.use-case';
import { ListUserUseCase } from '../../../../application/user/use-cases/list-user.use-case';
import { UpdateUserDto } from '../../../../application/user/dto/update-user.dto';
import { ListUserDto } from '../../../../application/user/dto/list-user.dto';
import { EnableUserUseCase } from '../../../../application/user/use-cases/enable-user.use-case';
import { JwtAuthGuard } from '../../../../application/auth/jwt-auth.guard';

@ApiTags('User')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@UseFilters(InvalidUserExceptionFilter)
@UseFilters(UserAlreadyExistsExceptionFilter)
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly disableUserUseCase: DisableUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly listUserUseCase: ListUserUseCase,
    private readonly enableUserUseCase: EnableUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: CreateUserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Validation error.' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: CreateUserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.updateUserUseCase.execute(id, updateUserDto);
  }

  @ApiOperation({ summary: 'List users.' })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: CreateUserResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  async list(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    filter: ListUserDto,
  ) {
    return await this.listUserUseCase.execute(filter);
  }

  @ApiOperation({ summary: 'Get a user.' })
  @ApiResponse({
    status: 200,
    description: 'Get User',
    type: CreateUserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.getUserByIdUseCase.execute(id);
  }

  @ApiOperation({ summary: "Change user's status to false." })
  @ApiResponse({
    status: 200,
    description: 'Get User',
    type: CreateUserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':id/disabled')
  async disable(@Param('id') id: string) {
    return this.disableUserUseCase.execute(id);
  }

  @ApiOperation({ summary: "Change user's status to true" })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':id/enabled')
  async enable(@Param('id') id: string) {
    return this.enableUserUseCase.execute(id);
  }
}
