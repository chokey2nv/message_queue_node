import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export default interface ConfigInterface {
  readonly env: 'development' | 'test' | 'staging' | 'production';
  readonly port: number;
  readonly rabbitmqUrl: string;
  readonly database: MysqlConnectionOptions | SqliteConnectionOptions;
  readonly rabbitmq: {
    host: string;
    port: string;
    password: string;
    user: string;
  };
  readonly cryptoApiUrl: string;
}
