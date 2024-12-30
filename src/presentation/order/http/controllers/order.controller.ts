import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from '../../../../application/orders/dto/create-order.dto';
import { CreateOrderUseCase } from '../../../../application/orders/use-cases/create-order.use-case';
import { InvalidDateExceptionFilter } from '../filter/invalid-date-exception.filter';
import { UpdateOrderDto } from '../../../../application/orders/dto/update-order.dto';
import { UpdateOrderUseCase } from '../../../../application/orders/use-cases/update-order.use-case';
import { GetOrderByIdUseCase } from '../../../../application/orders/use-cases/get-order-by-id.use-case';
import { InactivateOrderUseCase } from '../../../../application/orders/use-cases/inactive-order.use-case';
import { ListOrderUseCase } from '../../../../application/orders/use-cases/list-order.use-case';
import { ListOrderDto } from '../../../../application/orders/dto/list-order.dto';
import { InvalidOrderExceptionFilter } from '../filter/invalid-order-exception.filter';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderResponseDto } from '../../../../application/orders/dto/create-order-response.dto';
import { JwtAuthGuard } from '../../../../application/auth/jwt-auth.guard';
import { InvalidCarExceptionFilter } from '../../../cars/http/filters/invalid-car-exception.filter';
import { InvalidClientExceptionFilter } from '../../../client/http/filter/invalid-client-exception.filter';

@ApiTags('Order')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@UseFilters(InvalidDateExceptionFilter)
@UseFilters(InvalidOrderExceptionFilter)
@UseFilters(InvalidCarExceptionFilter)
@UseFilters(InvalidClientExceptionFilter)
@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrder: CreateOrderUseCase,
    private readonly updateOrder: UpdateOrderUseCase,
    private readonly findByIdOrder: GetOrderByIdUseCase,
    private readonly inactivateOrder: InactivateOrderUseCase,
    private readonly listOrder: ListOrderUseCase,
  ) {}

  @ApiOperation({ summary: 'Create an order.' })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: CreateOrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Validation error.' })
  @ApiResponse({ status: 409, description: 'Order already exists.' })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrder.execute(createOrderDto);
  }

  @ApiOperation({ summary: 'Update an order.' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CreateOrderResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.updateOrder.execute(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Find an order by id.' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CreateOrderResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.findByIdOrder.execute(id);
  }

  @ApiOperation({ summary: "List orders by order's status or client's CPF." })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CreateOrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @Get()
  async list(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    filter: ListOrderDto,
  ) {
    return this.listOrder.execute(filter);
  }

  @ApiOperation({ summary: 'Inactivate order by id.' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CreateOrderResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  @Patch(':id/inactivate')
  async inactivate(@Param('id') id: string) {
    return this.inactivateOrder.execute(id);
  }
}
