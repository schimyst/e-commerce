import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.USERS_SERVICE_POSTGRES_URI,
  entities: [UserEntity],
  migrations: ['dist/apps/users/db/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
