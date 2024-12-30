import { IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class AddressDto {
  @Expose()
  @IsString()
  @Type(() => String)
  state: string;

  @Expose()
  @IsString()
  @Type(() => String)
  city: string;

  @Expose()
  @IsString()
  @Type(() => String)
  postalCode: string;

  @Expose()
  @IsString()
  @Type(() => String)
  gia: string;
}
