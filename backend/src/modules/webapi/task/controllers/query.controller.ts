import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { WebApiTaskQueryService } from '../services/query.service';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '@backend/config/constants/swagger-tags';
import { TaskDto } from '../dto/task.dto';
import { HttpException } from '@backend/common/exceptions/http.exception';
import { GetTasksQueryDto } from '../dto/getTasks/query';

@Controller('tasks')
@ApiTags(SWAGGER_TAGS.TASK)
export class WebApiTaskQueryController {
  constructor(
    @Inject(WebApiTaskQueryService)
    private readonly webApiTaskQueryService: WebApiTaskQueryService,
  ) {}

  @ApiResponse({ status: 200, type: TaskDto, isArray: true })
  @Get()
  async getTasks(@Query() query: GetTasksQueryDto) {
    return this.webApiTaskQueryService.getTasks(query);
  }

  @ApiResponse({ status: 200, type: TaskDto })
  @ApiNotFoundResponse({
    type: HttpException,
    description: 'Task not found',
  })
  @Get(':taskId')
  async getTask(@Param('taskId') taskId: string) {
    return this.webApiTaskQueryService.getTask(taskId);
  }
}
