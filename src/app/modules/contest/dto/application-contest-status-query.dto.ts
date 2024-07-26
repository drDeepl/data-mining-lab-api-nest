import { CONTEST_STATUS } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class ApplicaitonContestStatusQueryDto {
  @IsEnum(CONTEST_STATUS, {
    message: `статус заявки может принимать одно из следующих значений ${CONTEST_STATUS}`,
  })
  applicationStatus: string;
}
