import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListUserDto {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'maria',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  name?: string;

  @ApiProperty({
    description: 'O email do usuário',
    example: 'maria@compass.pb.com.br',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  @Type(() => String)
  email?: string;

  @ApiProperty({
    description: 'status do usuário',
    example: true,
    type: 'boolean',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  status?: boolean;

  @ApiProperty({
    description: 'número da página',
    example: 2,
    type: 'number',
  })
  @IsOptional()
  @IsInt({ message: 'page must be an integer number' })
  @IsPositive({ message: 'page must be a positive number' })
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'número de registros por página',
    example: 5,
    type: 'number',
  })
  @IsOptional()
  @IsInt({ message: 'limit must be an integer number' })
  @IsPositive({ message: 'limit must be a positive number' })
  @Type(() => Number)
  limit?: number = 10;
}
