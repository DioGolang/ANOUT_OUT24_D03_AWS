import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ItemResponseDto {
  @ApiProperty({
    description: 'Name of the item',
    example: 'GPS Tracker',
    type: 'string',
  })
  @Expose()
  @Type(() => String)
  name: string;
}
