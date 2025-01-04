import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserBodyDto } from '../dto/create-user/body.dto';
import { UserDto } from '../dto/user.dto';
import { QueryFailedError } from 'typeorm';
import { UserMutationService } from '@backend/modules/business/user/services/mutation.service';

@Injectable()
export class WebApiUserMutationService {
  constructor(
    @Inject(UserMutationService)
    private readonly userMutationService: UserMutationService,
  ) {}

  async createUser(payload: CreateUserBodyDto): Promise<UserDto> {
    try {
      const user = await this.userMutationService.createUser({
        username: payload.username,
      });
      return {
        username: user.username,
      };
    } catch (error) {
      // Re-throw other errors
      throw error;
    }
  }
}
