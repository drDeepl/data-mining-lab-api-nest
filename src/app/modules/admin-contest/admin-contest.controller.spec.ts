import { Test, TestingModule } from '@nestjs/testing';
import { AdminContestController } from './admin-contest.controller';

describe('AdminContestController', () => {
  let controller: AdminContestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminContestController],
    }).compile();

    controller = module.get<AdminContestController>(AdminContestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
