import { InvalidCarException } from '../exceptions/invalid-car.exception';

export class Items {
  private readonly values: string[];

  constructor(items: string[]) {
    if (!items && items.length < 1) {
      throw new InvalidCarException('The item is less than 1');
    }

    if (items.length > 5) {
      throw new InvalidCarException('The item is greater than 5');
    }

    const uniqueItems = new Set(items);

    if (uniqueItems.size !== items.length) {
      throw new InvalidCarException('Repeated items');
    }

    this.values = [...uniqueItems];
  }

  contains(item: string): boolean {
    return this.values.includes(item);
  }

  getItems(): string[] {
    return this.values;
  }

  toString(): string {
    return this.values.join(', ');
  }
}
