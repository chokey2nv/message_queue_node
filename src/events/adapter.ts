import { Transaction } from '../entities/Transaction';

export abstract class EventBus {
  async publish(transactions: Transaction[]): Promise<void> {
    //implement event bus here
    throw new Error('publish method not implemented');
  }

  //other event bus possible methods
  // abstract subscribe(eventName: string, handler: (event: Event) => Promise<void>): Promise<void>;

  // abstract unsubscribe(eventName: string, handler: (event: Event) => Promise<void>): Promise<void>;

  // abstract disconnect(): Promise<void>;
}
