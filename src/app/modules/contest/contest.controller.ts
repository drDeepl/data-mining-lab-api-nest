import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ContestController')
@Controller('contests')
export class ContestController {}
