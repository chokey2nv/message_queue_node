import { allTransactions, clientTransactions, walletTransactions } from '../controllers';

const express = require('express');
const transactionRouter = express.Router();

// Route to get all transactions
transactionRouter.get('/transactions', allTransactions);
// Route to get a specific client's transactions
transactionRouter.get('/clienttxs/:clientId', clientTransactions);
// Route to get a specific address's transactions
transactionRouter.get('/addresstxs/:address', walletTransactions);

export default transactionRouter;
