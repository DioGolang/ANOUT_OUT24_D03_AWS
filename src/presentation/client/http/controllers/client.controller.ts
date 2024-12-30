import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Patch,
  UseFilters,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateClientUseCase } from '../../../../application/client/use-cases/create-client.use-case';
import { CreateClientDto } from '../../../../application/client/dto/create-client.dto';
import { InvalidClientExceptionFilter } from '../filter/invalid-client-exception.filter';
import { UpdateClientUseCase } from '../../../../application/client/use-cases/update-client.use-case';
import { UpdateClientDto } from '../../../../application/client/dto/update-client.dto';
import { DesactiveClientUseCase } from '../../../../application/client/use-cases/desactive-client.use-case';
import { ListClientUseCase } from '../../../../application/client/use-cases/list-client.use-case';
import { ListClientDto } from '../../../../application/client/dto/list-client.dto';
import { GetClientByIdUseCase } from '../../../../application/client/use-cases/get-client-by-id.use-case.ts';
import { JwtAuthGuard } from '../../../../application/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateClientResponseDto } from '../../../../application/client/dto/create-client-response.dto';

@ApiTags('Client')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@UseFilters(InvalidClientExceptionFilter)
@Controller('client')
export class ClientController {
  constructor(
    private readonly createClient: CreateClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly desactiveClientUseCase: DesactiveClientUseCase,
    private readonly listClientUseCase: ListClientUseCase,
    private readonly getClientByIdUseCase: GetClientByIdUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a client.' })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: CreateClientResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Validation error.' })
  @ApiResponse({ status: 409, description: 'Client already exists.' })
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.createClient.execute(createClientDto);
  }

  @ApiOperation({ summary: 'Update a client.' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CreateClientResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @Patch(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.updateClientUseCase.execute(id, updateClientDto);
  }

  @ApiOperation({ summary: 'Inactivate client by id.' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CreateClientResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @Patch(':id/desactive')
  async desactiveClient(@Param('id') id: string) {
    return this.desactiveClientUseCase.execute(id);
  }

  @ApiOperation({ summary: 'List clients by email, name, cpf and status.' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CreateClientResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 409, description: 'Client already exists' })
  @Get()
  async listClients(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    filter: ListClientDto,
  ) {
    return this.listClientUseCase.execute(filter);
  }

  @ApiOperation({ summary: 'Find a client by id.' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CreateClientResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @Get(':id')
  async getClientById(@Param('id') id: string) {
    return this.getClientByIdUseCase.execute(id);
  }
}
