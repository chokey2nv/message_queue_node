import axios from 'axios';
import config from '../config';
import { CryptoTx } from '../types';

class CryptoClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getTransactions(walletAddress: string, currencyType: string, fromTimestamp: number): Promise<CryptoTx[]> {
    const url = `${this.baseUrl}/transactions?address=${walletAddress}&currency=${currencyType}&from_date=${fromTimestamp}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch transactions from Crypto API. Status code: ${response.status}`);
    }
    return response.data as CryptoTx[];
  }
}

export default new CryptoClient(config.cryptoApiUrl);
