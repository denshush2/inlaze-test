import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WebApiTaskMutationService } from '../services/mutation.service';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '@backend/config/constants/swagger-tags';
import { CreateTaskBodyDto } from '../dto/createTask/body';
import { TaskDto } from '../dto/task.dto';
import { HttpException } from '@backend/common/exceptions/http.exception';
import { UpdateTaskDto } from '../dto/updateTask/body';

@Controller('tasks')
@ApiTags(SWAGGER_TAGS.TASK)
export class WebApiTaskMutationController {
  constructor(
    @Inject(WebApiTaskMutationService)
    private readonly webApiTaskMutationService: WebApiTaskMutationService,
  ) {}

  @Post()
  @ApiResponse({ status: 200, type: TaskDto })
  @ApiBadRequestResponse({
    type: HttpException,
  })
  async createTask(@Body() payload: CreateTaskBodyDto) {
    return this.webApiTaskMutationService.createTask(payload);
  }

  @Patch(':taskId')
  @ApiResponse({ status: 200, type: TaskDto })
  @ApiBadRequestResponse({
    type: HttpException,
  })
  async updateTask(
    @Body() payload: UpdateTaskDto,
    @Param('taskId') taskId: string,
  ) {
    return this.webApiTaskMutationService.updateTask({
      payload,
      taskId,
    });
  }

  @Delete(':taskId')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBadRequestResponse({
    type: HttpException,
  })
  async deleteTask(@Param('taskId') taskId: string) {
    return this.webApiTaskMutationService.deleteTask(taskId);
  }
}
