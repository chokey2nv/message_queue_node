import { Request, Response } from 'express';
import { getAllTransactions, getClientTransactions, getWalletTransactions } from '../models';

export async function allTransactions(req: Request, res: Response) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const transactions = await getAllTransactions(Number(page), Number(limit));
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function clientTransactions(req: Request, res: Response) {
  const { clientId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const clientTransactions = getClientTransactions(Number(clientId), {
      page: page as number,
      pageSize: limit as number,
    });
    res.json(clientTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export async function walletTransactions(req: Request, res: Response) {
  const { address } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const addressTransactions = getWalletTransactions(address, {
      page: page as number,
      pageSize: limit as number,
    });
    res.json(addressTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
