import { Test, TestingModule } from '@nestjs/testing';
import { ResearchPaperService } from './research-paper.service';

describe('ResearchPaperService', () => {
  let service: ResearchPaperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchPaperService],
    }).compile();

    service = module.get<ResearchPaperService>(ResearchPaperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
