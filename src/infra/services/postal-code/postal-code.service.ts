import { PostalCode } from '../../../domain/api/postal-code.interface';
import { AddressDto } from '../../../application/shared/validators/dto/addressDto';
import { NotFoundException } from '@nestjs/common';

export class PostalCodeService implements PostalCode {
  async getPostalCodeInfo(postalCode: string): Promise<AddressDto> {
    const response = await fetch(
      `https://viacep.com.br/ws/${postalCode}/json/`,
    );

    if (!response.ok) {
      throw new NotFoundException('Postal code not found');
    }
    const data = await response.json();

    const postalCodeInfo = new AddressDto();
    postalCodeInfo.postalCode = data.cep;
    postalCodeInfo.city = data.localidade;
    postalCodeInfo.state = data.uf;
    postalCodeInfo.gia = data.gia;
    return postalCodeInfo;
  }
}
