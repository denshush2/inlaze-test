import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { TaskStatus } from '@backend/interfaces/taskStatus.type';

@Injectable()
export class TaskMutationService {
  private readonly logger = new Logger(TaskMutationService.name);
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,

    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async loadMultipleTasks(
    tasks: {
      user: UserEntity;
      title: string;
      description: string;
      dueDate: Date;
    }[],
  ): Promise<TaskEntity[]> {
    const result: TaskEntity[] = [];

    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        for (const task of tasks) {
          const { user, title, description, dueDate } = task;

          // Create and save the task
          const newTask = manager.create(TaskEntity, {
            user,
            title,
            description,
            dueDate,
          });

          const savedTask = await manager.save(TaskEntity, newTask);
          result.push(savedTask); // Add the newly created task to the result
        }
      });

      this.logger.log(
        `[TaskMutationService](loadMultipleTasks): Successfully created tasks.`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `[TaskMutationService](loadMultipleTasks): Error creating tasks: ${error.message}`,
      );
      throw error;
    }
  }

  async createTask(task: {
    user: UserEntity;
    title: string;
    description: string;
    dueDate: Date;
  }) {
    try {
      this.logger.log(`[TaskMutationService](createTask): Creating task`);
      const taskEntity = this.taskRepository.create({
        ...task,
      });
      return this.taskRepository.save(taskEntity);
    } catch (error) {
      this.logger.error(
        `[TaskMutationService](createTask): Error creating task`,
      );
      throw error;
    }
  }

  async updateTask(task: {
    taskPublicId: string;
    title?: string;
    description?: string;
    dueDate?: Date;
    status?: TaskStatus;
  }) {
    try {
      this.logger.log(`[TaskMutationService](updateTask): Updating task`);
      const taskEntity = await this.taskRepository.findOne({
        where: {
          taskPublicId: task.taskPublicId,
        },
        relations: {
          user: true,
        },
      });
      if (!taskEntity) {
        throw new Error('Task not found');
      }

      if (task.status) {
        taskEntity.status = task.status;
      }

      if (task.title) {
        taskEntity.title = task.title;
      }
      if (task.description) {
        taskEntity.description = task.description;
      }
      if (task.dueDate) {
        taskEntity.dueDate = task.dueDate;
      }
      await this.taskRepository.update(taskEntity.id, taskEntity);
      return taskEntity;
    } catch (error) {
      this.logger.error(
        `[TaskMutationService](updateTask): Error updating task`,
      );
      throw error;
    }
  }

  async deleteTask(taskId: string): Promise<Boolean> {
    try {
      this.logger.log(`[TaskMutationService](deleteTask): Deleting task`);
      const taskEntity = await this.taskRepository.findOne({
        where: {
          taskPublicId: taskId,
        },
      });
      if (!taskEntity) {
        throw new Error('Task not found');
      }
      await this.taskRepository.update(taskEntity.id, {
        rowStatus: 'deleted',
      });
      return true;
    } catch (error) {
      this.logger.error(
        `[TaskMutationService](deleteTask): Error deleting task`,
      );
      throw error;
    }
  }
}
