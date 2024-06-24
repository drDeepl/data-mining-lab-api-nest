import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class UpdateUserDto extends BaseUserDto {
  @ApiProperty({
    description: 'группа пользователя(если он является студентом)',
    required: true,
    nullable: true,
  })
  groupId: number | null;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    groupId: number | null,
  ) {
    super(email, firstName, lastName);
    this.groupId = groupId ?? null;
  }
}
