export class AddressVo {
  readonly state: string;
  readonly city: string;
  readonly postalCode: string;
  readonly gia: string;

  constructor(state: string, city: string, postalCode: string, gia: string) {
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.gia = gia;
  }

  // validate() {}
}
