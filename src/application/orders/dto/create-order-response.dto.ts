import { Expose, Type } from 'class-transformer';
import { OrdersStatusEnum } from '../../../domain/enum/ordersStatus.enum';
import { CreateCarResponseDto } from '../../cars/dto/create-car-response.dto';
import { CreateClientResponseDto } from '../../client/dto/create-client-response.dto';
import { AddressDto } from '../../shared/validators/dto/addressDto';
import { ApiProperty } from '@nestjs/swagger';

@Expose()
export class CreateOrderResponseDto {
  @ApiProperty({
    description: "Order's id in UUID format.",
    example: 'fac63f91-2369-42aa-b7f9-3c6e30118086',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    description: 'The date the car will be rented.',
    example: '2024-12-15',
  })
  @Expose()
  @Type(() => Date)
  initialDate: Date;

  @ApiProperty({
    description: 'The date the car will be returned.',
    example: '2024-12-20',
  })
  @Expose()
  @Type(() => Date)
  finalDate: Date;

  @ApiProperty({
    description: 'Address where the car is rented.',
    example: { city: 'São Paulo', state: 'SP', gia: 1004, cecp: '04295020' },
  })
  @Expose()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({
    description: 'The rent fee.',
    example: '100',
  })
  @Expose()
  @Type(() => Number)
  rentalFee: number;

  @ApiProperty({
    description: 'The rent fee.',
    example: '5000',
  })
  @Expose()
  @Type(() => Number)
  totalRentalValue: number;

  @ApiProperty({
    description: 'The day the order is closed.',
    example: '2024-12-20',
  })
  @Expose()
  @Type(() => Date)
  orderClosingDate: Date;

  @ApiProperty({
    description: "The fine for the car's late delivery.",
    example: '3000',
  })
  @ApiProperty()
  @Expose()
  @Type(() => Number)
  lateFee: number;

  @ApiProperty({
    description: 'The order status.',
    example: 'OPEN',
  })
  @Expose()
  @Type(() => String)
  status: OrdersStatusEnum;

  @ApiProperty({
    description: "The order's car.",
    example: {
      brand: 'Volkswagen',
      model: 'Fusca',
      plate: 'ABC-8791',
      year: 2025,
      km: 1000,
      dailyRate: 500,
      status: true,
      createdAt: '2024-12-10',
      updatedAt: '2024-12-10',
      items: ['leather bank, air conditioning, ABS'],
    },
  })
  @Expose()
  @Type(() => CreateCarResponseDto)
  cars: CreateCarResponseDto;

  @ApiProperty({
    description: "The order's client.",
    example: {
      name: 'Letícia',
      email: 'leticia@email.com.br',
      cpf: '827.210.338-91',
      tel: '99859-6612',
      dateOfBirth: '25/12/1970',
    },
  })
  @Expose()
  @Type(() => CreateClientResponseDto)
  clients: CreateClientResponseDto;

  @ApiProperty({
    description: "Order's created date.",
    example: '2024-12-10',
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "Order's updated date.",
    example: '2024-12-10',
  })
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
