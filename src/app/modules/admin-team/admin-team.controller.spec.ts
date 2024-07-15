import { Test, TestingModule } from '@nestjs/testing';
import { AdminTeamController } from '../team/admin-team.controller';

describe('AdminTeamController', () => {
  let controller: AdminTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminTeamController],
    }).compile();

    controller = module.get<AdminTeamController>(AdminTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
