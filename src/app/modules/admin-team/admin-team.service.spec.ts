import { Test, TestingModule } from '@nestjs/testing';
import { AdminTeamService } from './admin-team.service';

describe('AdminTeamService', () => {
  let service: AdminTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminTeamService],
    }).compile();

    service = module.get<AdminTeamService>(AdminTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
