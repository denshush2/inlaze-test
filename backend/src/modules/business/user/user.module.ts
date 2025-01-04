import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserMutationService } from './services/mutation.service';
import { UserQueryService } from './services/query.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserMutationService, UserQueryService],
  exports: [UserMutationService, UserQueryService],
})
export class UserModule {}
