import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import { OrdersStatusEnum } from '../../../domain/enum/ordersStatus.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListOrderDto {
  @ApiProperty({
    description: "Order' status: OPEN, CLOSED, APPROVED, CANCELED.",
    example: 'APPROVED',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsEnum(OrdersStatusEnum)
  @Type(() => String)
  public readonly status?: OrdersStatusEnum;

  @ApiProperty({
    description: "Client's CPF.",
    example: '827.210.338-91',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'Invalid CPF! must contain at least 11 characters, only numbers',
  })
  @Type(() => String)
  public readonly clientCpf?: string;

  @ApiProperty({
    description: 'Page number',
    example: '1',
    type: 'number',
  })
  @IsInt({ message: 'page must be an integer number' })
  @IsPositive({ message: 'page must be a positive number' })
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'O nome do usuário',
    example: '10',
    type: 'number',
  })
  @IsInt({ message: 'limit must be an integer number' })
  @IsPositive({ message: 'limit must be a positive number' })
  @Type(() => Number)
  limit?: number = 10;
}
