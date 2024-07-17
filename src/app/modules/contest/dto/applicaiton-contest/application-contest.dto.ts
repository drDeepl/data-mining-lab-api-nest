import { ApplicationContest } from "@prisma/client";
import { BaseApplicationContestDto } from "./base-applicaiton-contest.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, MaxLength } from "class-validator";
import { ApplicationContestExtendedContestTeam } from "../../interfaces/application-contest/application-contest-extended-contest-team.interface";

export class ApplicationContestDto extends BaseApplicationContestDto{
    @ApiProperty({
        description: 'id заявки на участие в конкурсе',
        required: true,
        nullable: false,
      })
      @IsInt({message: "id заявки должен быть целым числом"})
      id: number


    @ApiProperty({
        description: 'название конкурса',
        required: true,
        nullable: false,
      })
      @IsNotEmpty({ message: 'поле с названием конкурса не может быть пустым' })
      @MaxLength(128, {
        message: 'поле с названием конкурса не может быть больше 128 символов',
      })
      contestName: string;

      @ApiProperty({
        description: 'название конкурса',
        required: true,
        nullable: false,
      })
      @IsNotEmpty({ message: 'поле с названием команды не может быть пустым' })
      @MaxLength(64, {
        message: 'поле с названием команды может быть больше 64 символов',
      })
      teamName: string;


    constructor(applicationContest: ApplicationContestExtendedContestTeam){
      console.log(applicationContest)
        super(applicationContest.githubLink, applicationContest.googleDocsLink)
        this.id = applicationContest.id
        this.contestName = applicationContest.contest.name
        this.teamName = applicationContest.team.name
    }
}