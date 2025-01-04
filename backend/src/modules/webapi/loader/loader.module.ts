import { Module } from '@nestjs/common';
import { WebApiLoaderController } from './loader.controller';
import { WebApiLoaderService } from './loader.service';
import { UserModule } from '@backend/modules/business/user/user.module';
import { TaskModule } from '@backend/modules/business/task/task.module';

@Module({
  imports: [UserModule, TaskModule],
  controllers: [WebApiLoaderController],
  providers: [WebApiLoaderService],
})
export class WebApiLoaderModule {}
