import { Module } from '@nestjs/common';
import { WebApiUserModule } from './user/user.module';
import { WebApiTaskModule } from './task/task.module';
import { WebApiLoaderModule } from './loader/loader.module';

@Module({
  imports: [WebApiUserModule, WebApiTaskModule, WebApiLoaderModule],
})
export class WebapiModule {}
