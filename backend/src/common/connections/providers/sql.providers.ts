import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const sqlProviders: (
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>
)[] = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        type: 'postgres',
        schema: 'inlaze',
        ssl: process.env.ENV !== 'local',
        url: configService.get('SQL_URI'),
        autoLoadEntities: true,
        logging: false,
      };
    },
  }),
];
