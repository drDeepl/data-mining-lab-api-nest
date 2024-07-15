import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    Logger,
  } from '@nestjs/common';
import { createException } from 'src/app/helpers/create-exception.helper';
import { TeamRepository } from '../repository/team.repository';
import { AuthorizedRequest } from '../../auth/type/authorized-request';


@Injectable()
export class MemberTeamGuard implements CanActivate {

  private readonly logger = new Logger(MemberTeamGuard.name);
  constructor(private readonly teamRepository: TeamRepository){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: AuthorizedRequest = context.switchToHttp().getRequest();
      const userExistsInTeam: boolean= await this.teamRepository.isUserExistsInTeam(Number(request.params.teamId), Number(request.user.sub))
      if(userExistsInTeam){
        return true
      }
      return false
    } catch (error) {
      throw createException(error, this.logger);
    }
  }
}