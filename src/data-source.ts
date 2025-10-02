import { config } from 'dotenv'
import { DataSourceOptions } from 'typeorm';

config();             //read and load .env file

export const dataSourceOpts: DataSourceOptions = {
  type: 'postgres',
  logging: true,
  url: process.env.DATABASE_URL
}
