import { Test, TestingModule } from '@nestjs/testing';
import { AdminResearchPaperService } from './admin-research-paper.service';

describe('AdminResearchPaperService', () => {
  let service: AdminResearchPaperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminResearchPaperService],
    }).compile();

    service = module.get<AdminResearchPaperService>(AdminResearchPaperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
