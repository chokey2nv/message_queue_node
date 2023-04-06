import * as amqp from 'amqplib/callback_api';
import config from '../config';
import { sleep } from '../utils/sleep';

class RabbitMQAdapter {
  private static instance: RabbitMQAdapter;

  public connection: amqp.Connection;

  private constructor() {}

  public static getInstance(): RabbitMQAdapter {
    if (!RabbitMQAdapter.instance) {
      RabbitMQAdapter.instance = new RabbitMQAdapter();
    }

    return RabbitMQAdapter.instance;
  }

  getConnection() {
    return this.connection;
  }

  startConnection() {
    return new Promise<{ err?: Error; connection?: amqp.Connection }>((resolve) => {
      amqp.connect(config.rabbitmqUrl, (err, connection) => {
        resolve({ err, connection });
      });
    });
  }
  async awaitConnection() {
    let maxAttempts = 10;
    let attempts = 0;
    let { err, connection } = await this.startConnection();
    for (attempts = 0; err && attempts < maxAttempts; attempts++) {
      console.error(`Failed to connect to RabbitMQ. Retrying in 5 seconds... (attempt ${attempts + 1}/${maxAttempts})`);
      await sleep(5000);
      const result = await this.startConnection();
      err = result.err;
      connection = result.connection;
    }
    if (err) throw err;
    this.connection = connection as amqp.Connection;
    return connection;
  }
  public async getChannel() {
    const connection = await this.awaitConnection();
    const channel = await new Promise<amqp.Channel>((resolve, reject) => {
      connection?.createChannel((error, channel) => {
        if (error) {
          reject(error);
        } else {
          resolve(channel);
        }
      });
    });

    return channel;
  }

  public async closeConnection(connection: amqp.Connection) {
    await connection.close();
  }
}

export default RabbitMQAdapter.getInstance();
