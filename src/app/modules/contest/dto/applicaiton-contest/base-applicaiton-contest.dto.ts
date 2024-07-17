import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class BaseApplicationContestDto{
    @ApiProperty({
        description: 'ссылка на репозиторий github с проектом',
        required: true,
        nullable: false,
      })
      @IsNotEmpty({ message: 'поле с ссылкой на репозиторий github не может быть пустым' })
      @MaxLength(128, {
        message: 'поле с ссылкой на репозиторий github не может быть больше 128 символов',
      })
      githubLink: string;

      @ApiProperty({
        description: 'ссылка на документацию',
        required: true,
        nullable: false,
      })
      @IsNotEmpty({ message: 'поле с ссылкой на документацию не может быть пустым' })
      @MaxLength(128, {
        message: 'поле с ссылкой на документацию не может быть больше 128 символов',
      })
      googleDocsLink: string;

      constructor(githubLink: string, googleDocsLink: string) {
        this.githubLink= githubLink
        this.googleDocsLink= googleDocsLink
      }

}