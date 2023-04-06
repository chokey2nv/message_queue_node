import path from 'path';
import ConfigInterface from './ConfigInterface';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const { RABBITMQ_PORT, RABBITMQ_HOST, RABBITMQ_USER, RABBITMQ_PASSWORD, PORT } = process.env;
const sqlite3Options: SqliteConnectionOptions = {
  type: 'sqlite' as const,
  cache: false,
  database: ':memory:',
  dropSchema: true,
  entities: [path.join(__dirname, '../entities/*.ts')],
  logger: 'advanced-console' as const,
  synchronize: true,
};
const config: ConfigInterface = {
  env: 'development',
  port: Number(PORT),
  rabbitmqUrl: `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}/`,
  // database: sqlite3Options,
  database: sqlite3Options,
  rabbitmq: {
    host: RABBITMQ_HOST as string,
    port: RABBITMQ_PORT as string,
    user: RABBITMQ_USER as string,
    password: RABBITMQ_PASSWORD as string,
  },
  cryptoApiUrl: 'https:crypto-api.com',
};
export default config;
