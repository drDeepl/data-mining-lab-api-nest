import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

class SignUpDto {
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
  firstName: string;
  @ApiProperty({
    description: 'фамилия пользователя',
    nullable: false,
    required: true,
  })
  lastName: string;

  @ApiProperty({
    description: 'id группы пользователя',
    nullable: true,
    required: false,
  })
  groupId: number;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    groupId: number,
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.groupId = groupId;
  }
}

export default SignUpDto;
