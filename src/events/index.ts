import { EventBus } from './adapter';

class MyEventBus extends EventBus {
  // private static instance variable to hold the singleton instance
  private static instance: MyEventBus;

  private constructor() {
    super();
    // initialize any necessary properties or dependencies
  }

  // static method to return the singleton instance or create it if it doesn't exist
  public static getInstance(): MyEventBus {
    if (!MyEventBus.instance) {
      MyEventBus.instance = new MyEventBus();
    }
    return MyEventBus.instance;
  }

  // implement the abstract methods of the EventBus class
}

// usage example:
const eventBus = MyEventBus.getInstance();
export default eventBus;
