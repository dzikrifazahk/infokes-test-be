import { databaseConfig } from 'src/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = databaseConfig();

export default new DataSource(config);
