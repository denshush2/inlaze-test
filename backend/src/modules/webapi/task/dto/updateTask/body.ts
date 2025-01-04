import { TaskStatus } from '@backend/interfaces/taskStatus.type';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    name: 'title',
    required: false,
    type: String,
    description: "Task's title",
  })
  title?: string;

  @ApiProperty({
    name: 'description',
    required: false,
    type: String,
    description: "Task's description",
  })
  description?: string | null;

  @ApiProperty({
    name: 'dueDate',
    required: false,
    type: Date,
    description: "Task's due date",
  })
  dueDate?: Date | null;

  @ApiProperty({
    name: 'status',
    required: false,
    type: String,
    enumName: 'TaskStatus',
    enum: ['open', 'in-progress', 'completed'],
    description: 'Task status',
  })
  status?: TaskStatus;
}
