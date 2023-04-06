import path from 'path';
import ConfigInterface from './ConfigInterface';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  RABBITMQ_PORT,
  RABBITMQ_HOST,
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
  PORT,
} = process.env;
const mysqlOptions: MysqlConnectionOptions = {
  type: 'mysql',
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  entities: [path.join(__dirname, '../entities/*.js')],
  synchronize: true, // Automatically create tables if they don't exist
};
const config: ConfigInterface = {
  env: 'production',
  port: Number(PORT),
  rabbitmqUrl: `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}/`,
  // database: sqlite3Options,
  database: mysqlOptions,
  rabbitmq: {
    host: RABBITMQ_HOST as string,
    port: RABBITMQ_PORT as string,
    user: RABBITMQ_USER as string,
    password: RABBITMQ_PASSWORD as string,
  },
  cryptoApiUrl: 'https:crypto-api.com',
};
export default config;
