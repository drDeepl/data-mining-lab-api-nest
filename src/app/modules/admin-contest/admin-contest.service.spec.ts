import { Test, TestingModule } from '@nestjs/testing';
import { AdminContestService } from './admin-contest.service';

describe('AdminContestService', () => {
  let service: AdminContestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminContestService],
    }).compile();

    service = module.get<AdminContestService>(AdminContestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
