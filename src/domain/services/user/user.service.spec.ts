import { Test, TestingModule } from '@nestjs/testing';
import { UserDomainService } from './user-domain.service';

describe('UserService', () => {
  let service: UserDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDomainService],
    }).compile();

    service = module.get<UserDomainService>(UserDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
