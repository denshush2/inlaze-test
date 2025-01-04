import { Test, TestingModule } from '@nestjs/testing';
import { TaskMutationService } from './mutation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import * as fs from 'fs';
import { DataSource } from 'typeorm';
import { UserMutationService } from '../../user/services/mutation.service';
import { TaskEntity } from '../entities/task.entity';

describe('TaskMutationService', () => {
  let service: TaskMutationService;
  let userService: UserMutationService;
  let module: TestingModule;
  const testDbPath = 'test-TaskMutationService.sqlite';

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: testDbPath,
          entities: ['./src/**/**.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([TaskEntity, UserEntity]),
      ],
      providers: [TaskMutationService, UserMutationService],
    }).compile();

    service = module.get<TaskMutationService>(TaskMutationService);
    userService = module.get<UserMutationService>(UserMutationService);
  });

  afterAll(async () => {
    const dataSource = module.get<DataSource>(DataSource);
    await dataSource.destroy();
    // Delete the SQLite file after tests
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const user = await userService.createUser({
        username: 'testuser-createTask-1',
      });
      const task = await service.createTask({
        title: 'Test task',
        user,
        description: 'Test task description',
        dueDate: new Date(),
      });
      expect(task).toBeDefined();
      expect(task.title).toBe('Test task');
      expect(task.description).toBe('Test task description');
      expect(task.dueDate).toBeInstanceOf(Date);
      expect(task.user).toBeInstanceOf(UserEntity);
    });

    // it('should handle error when task creation fails', async () => {
    //   const user = await userService.createUser({
    //     username: 'testuser-createTask-2',
    //   });

    //   console.log('service', service);
    //   // Mock the repository save method to throw an error
    //   jest
    //     .spyOn(service['taskRepository'], 'save')
    //     .mockRejectedValue(new Error('Database error'));

    //   await expect(
    //     service.createTask({
    //       title: 'Test task',
    //       user: null,
    //       description: 'Test task description',
    //       dueDate: new Date(),
    //     }),
    //   ).rejects.toThrow('Database error');
    // });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const user = await userService.createUser({
        username: 'testuser-updateTask',
      });

      const task = await service.createTask({
        title: 'Test task',
        user,
        description: 'Test task description',
        dueDate: new Date(),
      });
      const updatedTask = await service.updateTask({
        taskPublicId: task.taskPublicId,
        title: 'Updated task',
        description: 'Updated task description',
        dueDate: new Date(),
      });

      expect(updatedTask).toBeDefined();
      expect(updatedTask.title).toBe('Updated task');
      expect(updatedTask.taskPublicId).toEqual(task.taskPublicId);
      expect(updatedTask.description).toBe('Updated task description');
      expect(updatedTask.dueDate).toBeInstanceOf(Date);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const user = await userService.createUser({
        username: 'testuser-deleteTask',
      });
      const task = await service.createTask({
        title: 'Test task',
        user,
        description: 'Test task description',
        dueDate: new Date(),
      });
      const deletedTask = await service.deleteTask(task.taskPublicId);
      expect(deletedTask).toBeDefined();
      expect(deletedTask).toEqual(true);
    });
  });
});
