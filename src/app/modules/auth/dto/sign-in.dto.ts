import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
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
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
