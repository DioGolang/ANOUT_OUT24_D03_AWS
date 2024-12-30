import { AddressDto } from '../../application/shared/validators/dto/addressDto';

export interface PostalCode {
  getPostalCodeInfo(postalCode: string): Promise<AddressDto>;
}
