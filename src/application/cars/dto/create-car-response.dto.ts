import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ItemResponseDto } from './item-response.dto';

@Expose()
export class CreateCarResponseDto {
  @ApiProperty({
    description: 'Id Car',
    example: 'd329a5ad-c19c-4a63-bec5-b55df7ecdd9d',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    description: 'the brand of the car',
    example: 'Fiat',
    type: 'string',
  })
  @Expose()
  @Type(() => String)
  brand: string;

  @ApiProperty({
    description: 'The car model',
    example: 'Uno',
    type: 'string',
  })
  @Expose()
  @Type(() => String)
  model: string;

  @ApiProperty({
    description: 'The car plate',
    example: 'ABC-1234',
    type: 'string',
  })
  @Expose()
  @Type(() => String)
  plate: string;

  @ApiProperty({
    description: 'The car year',
    example: 2020,
    type: 'number',
  })
  @Expose()
  @Type(() => Number)
  year: number;

  @ApiProperty({
    description: 'The car km',
    example: 30,
    type: 'number',
  })
  @Expose()
  @Type(() => Number)
  km: number;

  @ApiProperty({
    description: 'The car daily rate',
    example: 100,
    type: 'number',
  })
  @Expose()
  @Type(() => Number)
  dailyRate: number;

  @ApiProperty({
    description: 'The car status',
    example: true,
    type: 'boolean',
  })
  @Expose()
  @Type(() => Boolean)
  status: boolean;

  @ApiProperty({
    description: 'The car created at',
    example: '2021-09-01T00:00:00.000Z',
    type: 'string',
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'The car updated at',
    example: '2021-09-01T00:00:00.000Z',
    type: 'string',
  })
  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({ type: [ItemResponseDto] })
  @Expose()
  @Type(() => ItemResponseDto)
  items: ItemResponseDto[];
}
