import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Expose()
export class CreateUserResponseDto {
  @ApiProperty({
    description: "User's id with UUID format.",
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    description: "User's name",
    example: 'maria',
    type: 'string',
  })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    description: "User's status.",
    example: true,
    type: 'boolean',
  })
  @Expose()
  @Type(() => Boolean)
  status: boolean;

  @ApiProperty({
    description: "User'semail",
    example: 'maria@compass.pb.com.br',
    type: 'string',
  })
  @Expose()
  @Type(() => String)
  email: string;

  @Exclude()
  passwordHash: string;

  @ApiProperty({
    description: "User's criation date.",
    example: '2021-09-01T00:00:00.000Z',
    type: 'string',
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "User's update date.",
    example: '2021-09-01T00:00:00.000Z',
    type: 'string',
  })
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
