class Singletone {
  private static instance: Singletone;
  private static _value: number;

  private constructor() {}

  //   Basic for Singletone pattern
  public static getInstance(): Singletone {
    if (!Singletone.instance) {
      Singletone.instance = new Singletone();
    }

    return Singletone.instance;
  }

  //   Basic methods
  set value(v: number) {
    Singletone._value = v;
  }

  get value() {
    return Singletone._value;
  }
}

let instance1 = Singletone.getInstance();
let instance2 = Singletone.getInstance();

// When to use singleton pattern

// Real world where we could use Singletone

// Singleton Logger Class

// log method

// Can have multiple methods

class Logger {
  private static instance: Logger;
  private constructor() {}

  static getLogger(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: string): void {
    const timestamp = new Date();
    console.log(`[${timestamp.toLocaleString()}] - ${message}`);
  }
}

// let instanceLogger1 =

class Application {
  constructor(private logger: Logger) {}

  run(): void {
    this.logger.log("Application is running");
    this.logger.log("Application is shutting down");
  }
}

let logger = Logger.getLogger();
let app = new Application(logger);

app.run();
