import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { WebapiModule } from '../webapi/webapi.module';
import { BusinessModule } from '../business/business.module';
import { sqlProviders } from '@backend/common/connections/providers/sql.providers';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ENV: Joi.string().required(),
        SQL_URI: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    ...sqlProviders,
    BusinessModule,
    WebapiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
