import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserQueryService {
  public logger = new Logger(UserQueryService.name);
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async getUser(username: string) {
    try {
      this.logger.log(
        `[UserQueryService](getUser): Getting user with username: ${username}`,
      );
      return this.userRepository.findOne({
        where: {
          username,
        },
      });
    } catch (error) {
      this.logger.error(
        `[UserQueryService](getUser): Error getting user with username: ${username}`,
      );
      throw error;
    }
  }

  async getUsers({
    page,
    limit = 10,
    order,
    username,
  }: {
    page?: number;
    limit?: number;
    order?: 'asc' | 'desc';
    username?: string;
  }) {
    try {
      this.logger.log(
        `[UserQueryService](getUsers): Getting users{page: ${page}, limit: ${limit}, order: ${order}, username: ${username}}`,
      );
      const query: FindManyOptions<UserEntity> = {
        order: {
          createdAt: 'DESC',
        },
      };
      if (page) {
        query.skip = page * limit;
      }
      if (username) {
        query.where = {
          username: ILike(`%${username}%`),
        };
      }
      if (limit) {
        query.take = limit;
      }
      if (order) {
        query.order = {
          createdAt: order,
        };
      }
      return this.userRepository.find(query);
    } catch (error) {
      this.logger.error(`[UserQueryService](getUsers): Error getting users`);
      throw error;
    }
  }
}
