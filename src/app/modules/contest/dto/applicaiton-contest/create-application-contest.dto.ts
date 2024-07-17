import { ApplicationContest } from "@prisma/client";
import { BaseApplicationContestDto } from "./base-applicaiton-contest.dto";

export class CreateApplicationContestDto extends BaseApplicationContestDto {
    constructor(githubLink: string, googleDocsLink: string) {
        super(githubLink, googleDocsLink)
    }
}