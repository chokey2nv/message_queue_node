export interface CryptoTx {
  hash: string;
  nonce: number;
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  from: string;
  to: string;
  value: number;
  gasPrice: number;
  gasLimit: number;
  input: string;
  timestamp: number;
}
export interface UpdateMessage {
  walletAddress: string;
  clientId: number;
  currencyType: string;
}
export interface APIResponse {
  data: any;
  total: number;
  totalPages: number;
  currentPage: number;
}
export interface PaginationOptions {
  page: number;
  pageSize: number;
}
