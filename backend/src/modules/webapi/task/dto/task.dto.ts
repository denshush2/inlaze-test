import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';
import { TASK_STATUS, TaskStatus } from '@backend/interfaces/taskStatus.type';

export class TaskDto {
  // This is taskPublicId
  @ApiProperty({
    name: 'id',
    required: true,
    type: String,
    description: "Task's id",
  })
  id: string;

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

  @ApiProperty({
    name: 'status',
    required: true,
    enum: TASK_STATUS,
    default: TASK_STATUS.Open,
  })
  status: TaskStatus;

  @ApiProperty({
    name: 'user',
    required: true,
    type: UserDto,
    description: "Task's user",
  })
  user: UserDto;
}
