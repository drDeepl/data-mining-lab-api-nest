import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class BaseUserDto {
  @ApiProperty({
    description: 'электронная почта пользователя',
    required: true,
    nullable: false,
  })
  @IsEmail({}, { message: 'неверный формат электронной почты' })
  email: string;

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

  constructor(email: string, firstName: string, lastName: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
