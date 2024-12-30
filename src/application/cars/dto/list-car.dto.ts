import {
  IsString,
  IsInt,
  IsPositive,
  IsNumber,
  IsOptional, IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListCarDto {
  @ApiProperty({
    description: "Cars's brand.",
    example: 'Fiat',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  brand?: string;

  @ApiProperty({
    description: "Cars's year.",
    example: '2023',
    type: 'number',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  year?: number;

  @ApiProperty({
    description: "Cars's km.",
    example: '30',
    type: 'number',
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  km?: number;

  @ApiProperty({
    description: "Cars's daily rate.",
    example: '25',
    type: 'number',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  dailyRate?: number;

  @ApiProperty({
    description: "Cars's status.",
    example: 'true',
    type: 'boolean',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  status?: boolean;

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
    description: 'limit page',
    example: '10',
    type: 'number',
  })
  @IsInt({ message: 'limit must be an integer number' })
  @IsPositive({ message: 'limit must be a positive number' })
  @Type(() => Number)
  limit?: number = 10;
}
