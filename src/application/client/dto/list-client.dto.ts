import {
  IsString,
  IsInt,
  IsPositive,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListClientDto {
  @ApiProperty({
    description: 'O e-mail do cliente',
    example: 'depto.vendas@teste.com.br',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  email?: string;

  @ApiProperty({
    description: 'O nome do cliente',
    example: 'Marcelo Jose de Sousa',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  name?: string;

  @ApiProperty({
    description: 'CPF do usuário',
    example: '123.456.789-01',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  cpf?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  tel?: string;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  dateOfBirth?: Date;

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
