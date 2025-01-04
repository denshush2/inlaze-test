import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskBodyDto {
  @ApiProperty({
    name: 'userUsername',
    required: true,
    type: String,
    description: "User's username",
  })
  userUsername: string;

  @ApiProperty({
    name: 'title',
    required: true,
    type: String,
    description: "Task's title",
  })
  title: string;

  @ApiProperty({
    name: 'description',
    required: false,
    type: String,
    description: "Task's description",
  })
  description: string | null;

  @ApiProperty({
    name: 'dueDate',
    required: false,
    type: Date,
    description: "Task's due date",
  })
  dueDate: Date | null;
}
