import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user.dto';

export class GetUsersDto {
  @ApiProperty({
    name: 'users',
    required: true,
    type: UserDto,
    isArray: true,
    description: 'Users',
  })
  users: UserDto[];
}
