import { Transaction } from '../entities/Transaction';

export abstract class Logger {
  log(transactions: Transaction[]) {}
  //other abstract log methods
}
