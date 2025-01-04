import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GetTasksQueryDto } from '../dto/getTasks/query';
import { TaskQueryService } from '@backend/modules/business/task/services/query.service';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class WebApiTaskQueryService {
  private readonly logger = new Logger(WebApiTaskQueryService.name);
  constructor(
    @Inject(TaskQueryService)
    private readonly taskQueryService: TaskQueryService,
  ) {}

  async getTask(taskId: string): Promise<TaskDto> {
    try {
      this.logger.log(`[WebApiTaskQueryService](getTask): Getting task`);
      const task = await this.taskQueryService.getTask(taskId);
      if (!task) {
        throw new HttpException(
          'No pudimos encontrar la tarea',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        id: task.taskPublicId,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        user: {
          username: task.user.username,
        },
      };
    } catch (error) {
      this.logger.error(
        `[WebApiTaskQueryService](getTask): Error getting task`,
      );
      throw error;
    }
  }

  async getTasks(query: GetTasksQueryDto): Promise<TaskDto[]> {
    try {
      this.logger.log(`[WebApiTaskQueryService](getTasks): Getting tasks`);
      const tasks = await this.taskQueryService.getTasks({
        username: query.username,
        page: query.page,
        limit: query.limit,
        order: query.order,
      });
      return tasks.map((task) => ({
        id: task.taskPublicId,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        user: {
          username: task.user.username,
        },
      }));
    } catch (error) {
      this.logger.error(
        `[WebApiTaskQueryService](getTasks): Error getting tasks`,
      );
      throw error;
    }
  }
}
