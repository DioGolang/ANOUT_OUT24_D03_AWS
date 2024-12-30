import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  IsEmail,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: "Client's email.",
    example: 'leticia@email.com.br',
  })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description: "Client's name.",
    example: 'Letícia',
  })
  @IsString()
  public readonly name: string;

  @ApiProperty({
    description: "Client's CPF.",
    example: '827.210.338-91',
  })
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'Invalid CPF! must contain at least 11 characters, only numbers',
  })
  public readonly cpf: string;

  @ApiProperty({
    description: "Client's phone.",
    example: '99859-6612',
  })
  @IsString()
  @Matches(/^\d{5}\-\d{4}$/, {
    message:
      'Invalid Phone! must contain at least 9 characters, only numbers, without DDD',
  })
  public readonly tel: string;

  @ApiProperty({
    description: "Client's birth.",
    example: '1970-12-08',
  })
  @IsString()
  @IsDateString()
  public readonly dateOfBirth: Date;

  //@IsBoolean()
  //public readonly status: boolean;
}
