import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBodyDto {
  @ApiProperty({
    name: 'username',
    required: true,
    type: String,
    description: "User's username",
  })
  username: string;
}
