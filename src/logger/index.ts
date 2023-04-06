import { Logger } from './adapter';

class MyLogger extends Logger {
  // private static instance variable to hold the singleton instance
  private static instance: MyLogger;

  private constructor() {
    super();
  }

  // static method to return the singleton instance or create it if it doesn't exist
  public static getInstance(): MyLogger {
    if (!MyLogger.instance) {
      MyLogger.instance = new MyLogger();
    }
    return MyLogger.instance;
  }
}
export default MyLogger.getInstance();
