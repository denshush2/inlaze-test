import { ApiProperty } from '@nestjs/swagger';

export class GetTasksQueryDto {
  @ApiProperty({
    name: 'username',
    required: false,
    type: String,
    description: "User's username",
  })
  username?: string;

  @ApiProperty({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  page?: number;

  @ApiProperty({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit',
  })
  limit?: number;

  @ApiProperty({
    name: 'order',
    required: false,
    type: String,
    description: "Order('asc' | 'desc')",
  })
  order?: 'asc' | 'desc';
}
