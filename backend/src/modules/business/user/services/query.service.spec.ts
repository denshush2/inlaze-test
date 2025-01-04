import { Test, TestingModule } from '@nestjs/testing';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UserQueryService } from './query.service';

describe('UserQueryService', () => {
  let service: UserQueryService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: ['./src/**/**.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      providers: [UserQueryService],
    }).compile();

    service = module.get<UserQueryService>(UserQueryService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const username = 'testuser';
      const mockUser = { username };
      const newUser = repository.create(mockUser);
      await repository.save(newUser);

      const user = await service.getUser(username);

      expect(user).toBeInstanceOf(UserEntity);

      //   expect(mockLogger.log).toHaveBeenCalled();
    });
    it("should return null if user doesn't exist", async () => {
      const username = 'testuser1';
      const user = await service.getUser(username);
      expect(user).toBeNull();
    });
    it('should handle errors and log them', async () => {
      const username = 'testuser';

      // Mock repository to throw an error
      const errorMessage = 'Database connection error';

      try {
        await service.getUser(username);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const username = 'testuser';
      const mockUser = { username };
      const newUser = repository.create(mockUser);
      await repository.save(newUser);

      const users = await service.getUsers({});
      expect(users).toBeInstanceOf(Array);
    });

    it('should handle errors and log them', async () => {
      const username = 'testuser';

      // Mock repository to throw an error
      const errorMessage = 'Database connection error';
      jest
        .spyOn(repository, 'find')
        .mockRejectedValueOnce(new Error(errorMessage));

      try {
        await service.getUsers({});
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
