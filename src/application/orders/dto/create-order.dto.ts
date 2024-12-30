import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { OrdersStatusEnum } from '../../../domain/enum/ordersStatus.enum';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Id CLient',
    example: 'd329a5ad-c19c-4a63-bec5-b55df7ecdd9d',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    description: 'The date the car will be rented.',
    example: '2024-12-15',
  })
  @IsDateString()
  public readonly initialDate: Date;

  @ApiProperty({
    description: 'The date the car will be returned.',
    example: '2024-12-20',
  })
  @IsDateString()
  public readonly finalDate: Date;

  @ApiProperty({
    description: 'CEP from where the car will be rented. (Only numbers)',
    example: '04295020',
  })
  @Type(() => String)
  @IsString()
  public readonly cep: string;

  @IsOptional()
  @IsNumber()
  public readonly rentalFee: number;

  @IsOptional()
  @IsNumber()
  public readonly totalRentalValue: number;

  @IsOptional()
  @IsDateString()
  public readonly orderClosingDate: Date;

  @IsOptional()
  @IsNumber()
  public readonly lateFee: number;

  @IsOptional()
  @IsEnum(OrdersStatusEnum)
  public readonly status: OrdersStatusEnum;

  @ApiProperty({
    description: "The car's ID that the client wants to rent.",
    example: '804e7f9a-b2ec-4524-89ab-5925e364e233',
  })
  @IsUUID()
  public readonly carsId: string;

  @ApiProperty({
    description: "The client's ID.",
    example: '775f80b6-56cd-4aee-b3d1-a85437b97b8d',
  })
  @IsUUID()
  public readonly clientsId: string;
}
