import { getRepository } from 'typeorm';
import { Transaction } from '../entities/Transaction';
import { APIResponse, CryptoTx, PaginationOptions, UpdateMessage } from '../types';

export async function addTransactions(
  { clientId, walletAddress, currencyType }: UpdateMessage,
  transactions: CryptoTx[]
): Promise<Transaction[]> {
  const transactionRepository = getRepository(Transaction);
  const savedTransactions: Transaction[] = [];
  for (const tx of transactions) {
    const existingTransaction = await transactionRepository.findOne({
      where: {
        transactionId: tx.hash,
      },
    });
    if (!existingTransaction) {
      const newTransaction = new Transaction();

      newTransaction.clientId = clientId;
      newTransaction.fromAddress = tx.from;
      newTransaction.toAddress = tx.to;
      newTransaction.currencyType = currencyType;
      newTransaction.walletAddress = walletAddress;
      newTransaction.transactionId = tx.hash;
      newTransaction.amount = tx.value;
      newTransaction.timestamp = tx.timestamp;
      savedTransactions.push(newTransaction);
      await transactionRepository.save(newTransaction);
    }
  }
  return savedTransactions;
}

export async function getMaxTransactionTimestamp(filter: UpdateMessage): Promise<number> {
  const transactionRepository = getRepository(Transaction);
  const result = await transactionRepository
    .createQueryBuilder('transaction')
    .select('MAX(transaction.timestamp)', 'maxTimestamp')
    .where(filter)
    .getRawOne();
  return result?.maxTimestamp;
}

export async function getAllTransactions(page: number, pageSize: number): Promise<APIResponse> {
  const transactionRepository = getRepository(Transaction);
  const [transactions, total] = await transactionRepository.findAndCount({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = Math.ceil(total / pageSize);

  return { data: transactions, total, totalPages, currentPage: page };
}
export async function getClientTransactions(clientId: number, options: PaginationOptions): Promise<APIResponse> {
  const { page, pageSize } = options;
  const transactionRepository = getRepository(Transaction);

  // calculate the limit and offset for pagination
  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  // query for the transactions for the specified client
  const [transactions, total] = await transactionRepository.findAndCount({
    where: { clientId },
    order: { timestamp: 'DESC' },
    skip: offset,
    take: limit,
  });

  // calculate total pages
  const totalPages = Math.ceil(total / pageSize);

  return { data: transactions, total, totalPages, currentPage: page };
}
export async function getWalletTransactions(walletAddress: string, options: PaginationOptions): Promise<APIResponse> {
  const { page, pageSize } = options;
  const transactionRepository = getRepository(Transaction);
  // calculate the limit and offset for pagination
  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  // query for the transactions for the specified client
  const [transactions, total] = await transactionRepository.findAndCount({
    where: { walletAddress },
    order: { timestamp: 'DESC' },
    skip: offset,
    take: limit,
  });

  // calculate total pages
  const totalPages = Math.ceil(total / pageSize);

  return { data: transactions, total, totalPages, currentPage: page };
}
