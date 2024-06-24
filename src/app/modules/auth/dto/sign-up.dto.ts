import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'email пользователя',
    nullable: false,
    required: true,
  })
  @IsEmail({}, { message: 'введенное значение не является электронной почтой' })
  email: string;

  @ApiProperty({
    description: 'пароль пользователя',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'пароль не может быть пустым' })
  password: string;

  @ApiProperty({
    description: 'имя пользователя',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'имя не может быть пустым' })
  firstName: string;

  @ApiProperty({
    description: 'фамилия пользователя',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'фамилия не может быть пустой' })
  lastName: string;

  @ApiProperty({
    description: 'id группы пользователя',
    nullable: true,
    required: false,
  })
  groupId: number | null;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    groupId: number | null,
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.groupId = groupId ? groupId : null;
  }
}
