import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TaskQueryService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getTask(taskId: string) {
    return this.taskRepository.findOne({
      where: {
        taskPublicId: taskId,
      },
      relations: {
        user: true,
      },
    });
  }

  async getTasks({
    username,
    page,
    limit = 10,
    order,
  }: {
    username?: string;
    page?: number;
    limit?: number;
    order?: 'asc' | 'desc';
  }) {
    const query: FindManyOptions<TaskEntity> = {
      relations: {
        user: true,
      },
      where: {
        rowStatus: 'active',
      },
      order: {
        createdAt: 'DESC',
      },
    };
    if (username) {
      query.where = {
        ...query.where,
        user: {
          username,
        },
      };
    }
    if (page) {
      query.skip = page * limit;
    }
    if (limit) {
      query.take = limit;
    }
    if (order) {
      query.order = {
        ...query.order,
        createdAt: order,
      };
    }
    return this.taskRepository.find(query);
  }
}
