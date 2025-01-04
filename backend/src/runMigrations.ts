import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

(async () => {
  config();
  const configService = new ConfigService();
  const options: DataSourceOptions = {
    type: 'postgres',
    schema: 'inlaze',
    ssl: process.env.ENV !== 'local',
    url: configService.getOrThrow('SQL_URI'),
    logging: true,
    entities: ['./src/**/**.entity{.ts,.js}'],
    migrations: ['./migrations/**'],
  };
  const dataSource = new DataSource(options); // usually imported

  await dataSource.runMigrations({
    transaction: 'all',
  });
  await dataSource.destroy();
})();
