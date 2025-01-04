import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  schema: 'inlaze',
  ssl: process.env.ENV !== 'local',
  url: configService.getOrThrow('SQL_URI'),
  logging: true,
  entities: ['./src/**/**.entity{.ts,.js}'],
  migrations: ['./migrations/**'],
});
