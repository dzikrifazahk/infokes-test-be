import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSourceOptions } from 'typeorm';

dotenv.config();
const entitiesPath = path.join('dist', 'modules', '**', '*.entity.js');

export const databaseConfig = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [entitiesPath],
  // synchronize: process.env.NODE_ENV === 'development',
  synchronize: true,
  logging: process.env.DB_QUERY_LOGGING === 'true',
  migrations: ['dist/db/migrations/*.js'],
});
