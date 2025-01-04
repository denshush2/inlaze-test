import { ApiProperty } from '@nestjs/swagger';
import { TaskDto } from '../../task/dto/task.dto';

export class UserDto {
  @ApiProperty({
    name: 'username',
    required: true,
    type: String,
    description: "User's username",
  })
  username: string;
}
