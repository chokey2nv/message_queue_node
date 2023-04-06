import { Message } from 'amqplib';
import { UpdateMessage } from '../types';
import rmqAdapter from './adapter';
export async function listenForUpdateTransactions(consumeMsg: (message: UpdateMessage) => Promise<void>) {
  const channel = await rmqAdapter.getChannel();

  await channel.assertQueue('updateTransactionsQueue');

  channel.consume('updateTransactionsQueue', async (msg) => {
    try {
      const updateTransactionsCommand = JSON.parse(msg?.content.toString() as string) as UpdateMessage;
      // consume message
      await consumeMsg(updateTransactionsCommand);
      // manually acknowledge the message
      channel.ack(msg as Message);
      rmqAdapter.closeConnection(rmqAdapter.getConnection());
    } catch (error) {
      // if there was an error processing the message, reject it and requeue it
      channel.nack(msg as Message, false, true);
      rmqAdapter.closeConnection(rmqAdapter.getConnection());
    }
  });
}
