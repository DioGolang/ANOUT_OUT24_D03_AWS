import { IsString, IsOptional, IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'maria',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'O nome do usuário',
    example: 'maria@compass.pb.com.br',
    type: 'string',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'o password do usuário',
    example: 'abc12345678',
    type: 'string',
  })
  @IsOptional()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 8 characters, including letters and numbers',
  })
  password?: string;
}
