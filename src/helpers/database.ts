import { ConnectionOptions, createConnection, useContainer, Connection } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

import config from '../config';
import { sleep } from '../utils/sleep';

useContainer(Container);
const dbConfig: ConnectionOptions = { ...config.database };

let connection: Connection;

export function getConnection() {
  return new Promise<{ error?: Error; connection?: Connection }>((resolve) => {
    if (!connection) {
      createConnection(dbConfig)
        .then((connection) => resolve({ connection }))
        .catch((error) => resolve({ error }));
    }
  });
}
export async function awaitConnection(): Promise<Connection> {
  let maxAttempts = 10;
  let attempts = 0;
  let { error, connection } = await getConnection();
  for (attempts = 0; error && attempts < maxAttempts; attempts++) {
    console.error(error);
    console.error(`Failed to connect to Mysql. Retrying in 5 seconds... (attempt ${attempts + 1}/${maxAttempts})`);
    await sleep(5000);
    const result = await getConnection();
    error = result.error;
    connection = result.connection;
  }
  if (error) throw error;
  return connection as Connection;
}
