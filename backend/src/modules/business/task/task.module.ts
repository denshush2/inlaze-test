import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TaskMutationService } from './services/mutation.service';
import { TaskQueryService } from './services/query.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskMutationService, TaskQueryService],
  exports: [TaskMutationService, TaskQueryService],
})
export class TaskModule {}
