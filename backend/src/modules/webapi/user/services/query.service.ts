import { UserQueryService } from '@backend/modules/business/user/services/query.service';
import { Injectable, Inject } from '@nestjs/common';
import { GetUsersQueryDto } from '../dto/getUsers/params';
import { GetUsersDto } from '../dto/getUsers/response';

@Injectable()
export class WebApiUserQueryService {
  constructor(
    @Inject(UserQueryService)
    private readonly userQueryService: UserQueryService,
  ) {}

  async getUser(username: string) {
    return this.userQueryService.getUser(username);
  }

  async getUsers({
    page,
    limit = 10,
    order,
    username,
  }: GetUsersQueryDto): Promise<GetUsersDto> {
    const users = await this.userQueryService.getUsers({
      page,
      limit,
      order,
      username,
    });
    return {
      users: users.map((user) => ({
        username: user.username,
      })),
    };
  }
}
