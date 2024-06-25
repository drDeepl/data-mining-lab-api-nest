import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class UserDto extends BaseUserDto {
  @ApiProperty({
    description: 'группа пользователя(если он является студентом)',
    required: true,
    nullable: false,
  })
  id: number;

  @ApiProperty({
    description: 'группа пользователя(если он является студентом)',
    required: true,
    nullable: true,
  })
  groupId: number | null;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    groupId: number | null,
  ) {
    super(email, firstName, lastName);
    this.id = id;
    this.groupId = groupId ?? null;
  }
}
