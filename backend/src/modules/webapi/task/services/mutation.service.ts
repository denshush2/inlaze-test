import { TaskMutationService } from '@backend/modules/business/task/services/mutation.service';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateTaskBodyDto } from '../dto/createTask/body';
import { TaskDto } from '../dto/task.dto';
import { UserQueryService } from '@backend/modules/business/user/services/query.service';
import { UpdateTaskDto } from '../dto/updateTask/body';

@Injectable()
export class WebApiTaskMutationService {
  private readonly logger = new Logger(WebApiTaskMutationService.name);
  constructor(
    @Inject(TaskMutationService)
    private readonly taskMutationService: TaskMutationService,
    @Inject(UserQueryService)
    private readonly userQueryService: UserQueryService,
  ) {}

  async updateTask({
    payload,
    taskId,
  }: {
    taskId: string;
    payload: UpdateTaskDto;
  }): Promise<TaskDto> {
    try {
      const updatedTask = await this.taskMutationService.updateTask({
        taskPublicId: taskId,
        title: payload.title,
        description: payload.description,
        dueDate: payload.dueDate,
        status: payload.status,
      });
      return {
        id: updatedTask.taskPublicId,
        title: updatedTask.title,
        description: updatedTask.description,
        dueDate: updatedTask.dueDate,
        status: updatedTask.status,
        user: updatedTask.user,
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[WebApiTaskMutationService](updateTask): Error updating task '${error.message}'<ErrorInstance>`,
        );
      } else if (error instanceof HttpException) {
        this.logger.error(
          `[WebApiTaskMutationService](updateTask): Error updating task '${error.message}'<HttpException>`,
        );
      } else {
        this.logger.error(
          `[WebApiTaskMutationService](updateTask): Error updating task '${error.message}'<ErrorInstance>`,
        );
      }
      throw error;
    }
  }

  async createTask(payload: CreateTaskBodyDto): Promise<TaskDto> {
    try {
      const user = await this.userQueryService.getUser(payload.userUsername);
      if (!user) {
        this.logger.error(
          `[WebApiTaskMutationService](createTask): User not found<HttpException>`,
        );
        throw new HttpException(
          'No pudimos crear la tarea',
          HttpStatus.NOT_FOUND,
        );
      }
      const task = await this.taskMutationService.createTask({
        user,
        title: payload.title,
        description: payload.description,
        dueDate: payload.dueDate,
      });
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
      if (error instanceof ConflictException) {
        this.logger.error(
          `[WebApiTaskMutationService](createTask): Error creating task '${error.message}'<ConflictException>`,
        );
        throw new HttpException(
          'No pudimos crear la tarea',
          HttpStatus.CONFLICT,
        );
      } else {
        this.logger.error(
          `[WebApiTaskMutationService](createTask): Error creating task '${error.message}'<ErrorInstance>`,
        );
      }
      // Re-throw other errors
      throw error;
    }
  }

  async deleteTask(taskId: string): Promise<Boolean> {
    try {
      const deleted = await this.taskMutationService.deleteTask(taskId);
      return deleted;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[WebApiTaskMutationService](deleteTask): Error deleting task '${error.message}'<ErrorInstance>`,
        );
      }
      if (error instanceof HttpException) {
        this.logger.error(
          `[WebApiTaskMutationService](deleteTask): Error deleting task '${error.message}'<HttpException>`,
        );
      }
      throw error;
    }
  }
}
