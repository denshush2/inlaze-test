import { SWAGGER_TAGS } from '@backend/config/constants/swagger-tags';
import { Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WebApiLoaderService } from './loader.service';

@Controller('loader')
@ApiTags(SWAGGER_TAGS.LOADER)
export class WebApiLoaderController {
  constructor(
    @Inject(WebApiLoaderService)
    private readonly webApiLoaderService: WebApiLoaderService,
  ) {}

  @Post('load-data')
  @ApiResponse({ status: 200, type: Boolean })
  async loadData() {
    return this.webApiLoaderService.loadData();
  }
}
