import { Body, Controller, Inject, Post } from '@nestjs/common';
import { WebApiUserMutationService } from '../services/mutation.service';
import { CreateUserBodyDto } from '../dto/create-user/body.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { SWAGGER_TAGS } from '@backend/config/constants/swagger-tags';
import { HttpException } from '@backend/common/exceptions/http.exception';

@Controller('users')
@ApiTags(SWAGGER_TAGS.USER)
export class WebApiUserMutationController {
  constructor(
    @Inject(WebApiUserMutationService)
    private readonly webApiUserMutationService: WebApiUserMutationService,
  ) {}

  @ApiBody({ type: CreateUserBodyDto })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiBadRequestResponse({
    type: HttpException,
  })
  @Post()
  async createUser(@Body() body: CreateUserBodyDto) {
    return this.webApiUserMutationService.createUser(body);
  }
}
