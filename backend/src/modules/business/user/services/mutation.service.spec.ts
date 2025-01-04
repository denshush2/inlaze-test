import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DeepPartial } from 'typeorm';
import * as fs from 'fs';

import { UserEntity } from '../entities/user.entity';
import { UserMutationService } from './mutation.service';

describe('UserMutationService', () => {
  let service: UserMutationService;
  let module: TestingModule;
  const testDbPath = 'test-database.sqlite';

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: testDbPath,
          entities: ['./src/**/**.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      providers: [UserMutationService],
    }).compile();

    service = module.get<UserMutationService>(UserMutationService);
  });

  afterAll(async () => {
    const dataSource = module.get<DataSource>(DataSource);
    await dataSource.destroy();
    // Delete the SQLite file after tests
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  // Example User entity for reference
  const testUser = {
    username: 'testuser',
  };

  describe('create', () => {
    it('should create a new user', async () => {
      const created = await service.createUser(testUser);
      expect(created).toBeDefined();
      expect(created.username).toBe(testUser.username);
    });
  });

  //   describe('findAll', () => {
  //     it('should return an array of users', async () => {
  //       const users = await service.findAll();
  //       expect(Array.isArray(users)).toBe(true);
  //       expect(users.length).toBeGreaterThan(0);
  //     });
  //   });

  //   describe('findOne', () => {
  //     it('should find a user by id', async () => {
  //       const created = await service.create(testUser);
  //       const found = await service.findOne(created.id);
  //       expect(found).toBeDefined();
  //       expect(found.id).toBe(created.id);
  //     });

  //     it('should return null for non-existent user', async () => {
  //       const found = await service.findOne(999999);
  //       expect(found).toBeNull();
  //     });
  //   });

  //   describe('update', () => {
  //     it('should update a user', async () => {
  //       const created = await service.create(testUser);
  //       const updateData = { name: 'Jane Doe' };
  //       const updated = await service.update(created.id, updateData);
  //       expect(updated).toBeDefined();
  //       expect(updated.name).toBe(updateData.name);
  //     });
  //   });

  //   describe('remove', () => {
  //     it('should remove a user', async () => {
  //       const created = await service.create(testUser);
  //       await service.remove(created.id);
  //       const found = await service.findOne(created.id);
  //       expect(found).toBeNull();
  //     });
  //   });
});
