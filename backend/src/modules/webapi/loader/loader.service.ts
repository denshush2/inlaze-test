import { Inject, Injectable, Logger } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { UserMutationService } from '@backend/modules/business/user/services/mutation.service';
import { TaskMutationService } from '@backend/modules/business/task/services/mutation.service';
import { UserEntity } from '@backend/modules/business/user/entities/user.entity';
@Injectable()
export class WebApiLoaderService {
  private readonly logger = new Logger(WebApiLoaderService.name);
  constructor(
    @Inject(UserMutationService)
    private readonly userMutationService: UserMutationService,

    @Inject(TaskMutationService)
    private readonly taskMutationService: TaskMutationService,
  ) {}

  private _createFakerRandomTask() {
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      dueDate: faker.date.soon(),
      status: faker.helpers.arrayElement(['open', 'in-progress', 'completed']),
    };
  }
  async loadData(): Promise<Boolean> {
    try {
      this.logger.log(`[WebApiLoaderService](loadData): Loading data`);
      const fakeUsernames: string[] = [];
      for (let i = 0; i < 100; i++) {
        const username = faker.internet.username();
        fakeUsernames.push(username);
      }

      const newUsers = await this.userMutationService.loadMultipleUsers(
        fakeUsernames,
      );
      const tasksToLoad: {
        user: UserEntity;
        title: string;
        description: string;
        dueDate: Date;
      }[] = [];
      newUsers.forEach((user) => {
        const tasks = faker.helpers.multiple(this._createFakerRandomTask, {
          count: {
            min: 1,
            max: 10,
          },
        });

        tasksToLoad.push(
          ...tasks.map((task) => ({
            ...task,
            user,
          })),
        );
      });

      this.logger.log(`[WebApiLoaderService](loadData): Creating tasks`);
      await this.taskMutationService.loadMultipleTasks(tasksToLoad);
      this.logger.log(`[WebApiLoaderService](loadData): Data loaded`);
      return true;
    } catch (error) {
      this.logger.error(`[WebApiLoaderService](loadData): Error loading data`);

      throw error;
    }
  }
}
