import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    description: "Car's brand.",
    example: 'Fiat',
    type: 'string',
  })
  @IsString()
  brand: string;

  @ApiProperty({
    description: "Car's model.",
    example: 'Uno',
    type: 'string',
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: "Car's plate on the old and new format.",
    example: 'ABC-1234 ou ABC1D23',
    type: 'string',
  })
  @Matches(/^[A-Z]{3}-[0-9][A-J0-9][0-9]{2}$/, { message: 'Invalid Plate' })
  plate: string;

  @ApiProperty({
    description: "Car's year",
    example: 2021,
    type: 'number',
  })
  @Min(new Date().getFullYear() - 9)
  @Max(new Date().getFullYear() + 1)
  @IsInt()
  year: number;

  @ApiProperty({
    description: "Car's km",
    example: 45,
    type: 'number',
  })
  @IsPositive()
  km: number;

  @ApiProperty({
    description: "Car's daily rate.",
    example: 45,
    type: 'number',
  })
  @IsNumber()
  dailyRate: number;

  @ApiProperty({
    description: "Car's items list.",
    example: ['Air conditioning', 'ABS'],
    type: [String],
  })
  @IsArray()
  items: string[];
}
