import { databaseConfig } from './database.config';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  nodenv: process.env.NODE_ENV,
  database: {
    ...databaseConfig(),
  },
});
