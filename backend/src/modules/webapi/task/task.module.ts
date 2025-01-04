import { TaskModule } from '@backend/modules/business/task/task.module';
import { UserModule } from '@backend/modules/business/user/user.module';
import { Module } from '@nestjs/common';
import { WebApiTaskMutationController } from './controllers/mutation.controller';
import { WebApiTaskQueryController } from './controllers/query.controller';
import { WebApiTaskMutationService } from './services/mutation.service';
import { WebApiTaskQueryService } from './services/query.service';

@Module({
  imports: [TaskModule, UserModule],
  controllers: [WebApiTaskMutationController, WebApiTaskQueryController],
  providers: [WebApiTaskMutationService, WebApiTaskQueryService],
})
export class WebApiTaskModule {}
