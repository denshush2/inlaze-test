import { Module } from '@nestjs/common';
import { WebApiUserQueryController } from './controllers/query.controller';
import { WebApiUserMutationController } from './controllers/mutation.controller';
import { WebApiUserMutationService } from './services/mutation.service';
import { WebApiUserQueryService } from './services/query.service';
import { UserModule } from '@backend/modules/business/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [WebApiUserQueryController, WebApiUserMutationController],
  providers: [WebApiUserQueryService, WebApiUserMutationService],
})
export class WebApiUserModule {}
