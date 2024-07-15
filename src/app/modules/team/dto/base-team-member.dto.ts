import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseTeamMemberDto {
  @ApiProperty({
    description: 'id пользователя',
    required: true,
    nullable: false,
  })
  id: number;

  @ApiProperty({
    description: 'имя пользователя',
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'имя не может быть пустым' })
  firstName: string;

  @ApiProperty({
    description: 'фамилия пользователя',
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'фамилия не может быть пустой' })
  lastName: string;

  constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
