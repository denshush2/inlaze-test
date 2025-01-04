import { Controller, Get, Inject, Query } from '@nestjs/common';
import { WebApiUserQueryService } from '../services/query.service';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { GetUsersQueryDto } from '../dto/getUsers/params';
import { SWAGGER_TAGS } from '@backend/config/constants/swagger-tags';
import { GetUsersDto } from '../dto/getUsers/response';

@ApiTags(SWAGGER_TAGS.USER)
@Controller('users')
export class WebApiUserQueryController {
  constructor(
    @Inject(WebApiUserQueryService)
    private readonly webApiUserQueryService: WebApiUserQueryService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: () => GetUsersDto })
  // page?: number;
  // limit?: number;
  // order?: 'asc' | 'desc';
  async getUsers(@Query() query: GetUsersQueryDto) {
    return this.webApiUserQueryService.getUsers(query);
  }
}
