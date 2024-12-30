import { InvalidCarException } from '../exceptions/invalid-car.exception';

export class Plate {
  private readonly value: string;

  constructor(plate: string) {
    if (!this.validatePlate(plate)) {
      throw new InvalidCarException('Invalidate plate format');
    }
    this.value = plate;
  }

  private validatePlate(plate: string): boolean {
    //  const plateRegex = /^[A-Z]{3}-\d[A-Z0-9]\d{2}$/;
    const plateRegex = /^[A-Z]{3}-[0-9][A-J0-9][0-9]{2}$/;
    return plate.length === 8 && plateRegex.test(plate);
  }

  toString(): string {
    return this.value;
  }
}
