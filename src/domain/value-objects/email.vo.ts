export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    this.value = email;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toString(): string {
    return this.value;
  }
}
