import { Inject, Injectable } from '@nestjs/common';
import { InvalidClientException } from '../../exceptions/invalid-client.exception';
import { ClientRepository } from '../../interfaces/repositories/ClientRepository.interface';

@Injectable()
export class ClientDomainService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
  ) {}

  async clientExists(email: string): Promise<void> {
    const clientExists = await this.clientRepository.findByEmail(email);
    if (clientExists) {
      throw new InvalidClientException(
        'There is already a customer with this email.',
      );
    }
  }
}
