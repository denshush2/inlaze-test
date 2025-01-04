import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    name: 'username',
    required: true,
    type: String,
    description: "User's username",
  })
  username: string;
}
