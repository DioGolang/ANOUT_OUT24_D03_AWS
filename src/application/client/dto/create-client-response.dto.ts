import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Expose()
export class CreateClientResponseDto {
  @ApiProperty({
    description: 'Id CLient',
    example: 'd329a5ad-c19c-4a63-bec5-b55df7ecdd9d',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    description: "Client's email.",
    example: 'leticia@email.com.br',
  })
  @Expose()
  @Type(() => String)
  email: string;

  @ApiProperty({
    description: "Client's name.",
    example: 'Letícia',
  })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    description: "Client's CPF.",
    example: '827.210.338-91',
  })
  @Expose()
  @Type(() => String)
  cpf: string;

  @ApiProperty({
    description: "Client's phone.",
    example: '99859-6612',
  })
  @Expose()
  @Type(() => String)
  tel: string;

  @ApiProperty({
    description: "Client's birth.",
    example: '25/12/1970',
  })
  @Expose()
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty({
    description: "The client's status.",
    example: true,
  })
  @Expose()
  @Type(() => Boolean)
  status: boolean;

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
