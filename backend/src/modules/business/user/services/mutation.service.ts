import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserMutationService {
  private readonly logger = new Logger(UserMutationService.name);
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async loadMultipleUsers(usernames: string[]): Promise<UserEntity[]> {
    const uniqueUsernames = Array.from(new Set(usernames)); // Remove duplicates from input
    const result: UserEntity[] = [];

    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        for (const username of uniqueUsernames) {
          let user = await manager.findOne(UserEntity, {
            where: { username },
          });

          if (!user) {
            user = manager.create(UserEntity, { username });
            user = await manager.save(UserEntity, user);
          } else {
            this.logger.log(
              `[UserMutationService](loadMultipleUsers): Username "${username}" already exists. Returning existing user.`,
            );
          }

          result.push(user);
        }
      });

      this.logger.log(
        `[UserMutationService](loadMultipleUsers): Successfully processed usernames.`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `[UserMutationService](loadMultipleUsers): Error loading users: ${error.message}`,
      );
      throw error;
    }
  }

  async createUser(user: { username: string }) {
    try {
      this.logger.log(`[UserMutationService](createUser): Creating user`);
      const userEntity = this.userRepository.create({
        ...user,
      });
      return this.userRepository.save(userEntity);
    } catch (error) {
      this.logger.error(
        `[UserMutationService](createUser): Error creating user`,
      );
      throw error;
    }
  }
}
