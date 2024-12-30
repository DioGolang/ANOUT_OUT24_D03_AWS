import { Test, TestingModule } from '@nestjs/testing';
import { AuthControllersController } from './auth-controllers.controller';

describe('ControllersController', () => {
  let controller: AuthControllersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthControllersController],
    }).compile();

    controller = module.get<AuthControllersController>(AuthControllersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
