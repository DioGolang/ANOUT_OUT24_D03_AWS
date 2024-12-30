import { IsBoolean, IsEmail, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'Id CLient',
    example: 'd329a5ad-c19c-4a63-bec5-b55df7ecdd9d',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    description: "User's name",
    example: 'João Silva',
  })
  @IsString()
  public readonly name: string;

  @ApiProperty({
    description: "User'semail",
    example: 'Joao@compass.com.br',
  })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description: "User'sstatus.",
    example: 'true',
  })
  @IsBoolean()
  public readonly status: boolean;

  @ApiProperty({
    description: "User's password.",
    example: 'Abc12345678',
    type: 'string',
  })
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 8 characters, including letters and numbers',
  })
  public readonly passwordHash: string;
}
