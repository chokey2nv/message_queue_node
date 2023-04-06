import 'reflect-metadata';
import { awaitConnection } from './helpers/database';
import express from 'express';
import { listenForUpdateTransactions } from './rabbitmq';
import cryptoClient from './helpers/crypto.api';
import { addTransactions, getMaxTransactionTimestamp } from './models';
import eventBus from './events';
import transactionRouter from './routers/transaction';
import logger from './logger';
import config from './config';
const app = express();

const PORT = config.port || 3000;

(async () => {
  await awaitConnection();

  listenForUpdateTransactions(async ({ walletAddress, clientId, currencyType }) => {
    try {
      //get the last time for the transaction of client's wallet for a specific currency
      const lastTimestamp = await getMaxTransactionTimestamp({ clientId, walletAddress, currencyType });
      //get new client's latest transaction of a specific currency from the crypto api
      const newTransactions = await cryptoClient.getTransactions(walletAddress, currencyType, lastTimestamp);
      //add the new transaction in the database
      const savedTransactions = await addTransactions({ clientId, walletAddress, currencyType }, newTransactions);
      //broadcast the new transactions
      eventBus.publish(savedTransactions);
      //log transactions
      logger.log(savedTransactions);
    } catch (e) {}
  }).catch(console.error);

  // Use the router
  app.use('/api', transactionRouter);
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}`);
  });
})();
