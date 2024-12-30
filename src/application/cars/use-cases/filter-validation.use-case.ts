import { BadRequestException } from '@nestjs/common';

export class FilterValidationUseCase {
  private validFilters = [
    'brand',
    'year',
    'km',
    'dailyRate',
    'status',
    'page',
    'limit',
  ];

  validateFilters(filter: Record<string, any>) {
    const filterKeys = Object.keys(filter);

    filterKeys.forEach((key) => {
      if (!this.validFilters.includes(key)) {
        throw new BadRequestException(`filter: "${key}" is not valid`);
      }
    });
  }
}
