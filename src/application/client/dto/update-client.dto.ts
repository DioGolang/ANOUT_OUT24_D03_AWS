import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Matches,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty({
    description: "Client's email.",
    example: 'leticia@email.com.br',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: "Client's name.",
    example: 'Letícia',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Client's CPF.",
    example: '827.210.338-91',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'Invalid CPF! must contain at least 11 characters, only numbers',
  })
  cpf?: string;

  @ApiProperty({
    description: "Client's phone.",
    example: '99859-6612',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{5}\-\d{4}$/, {
    message:
      'Invalid Phone! must contain at least 9 characters, only numbers, without DDD',
  })
  tel?: string;

  @ApiProperty({
    description: "Client's birth.",
    example: '1970-12-08',
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;
}
