// Decorator pattern

interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost(): number {
    return 10;
  }

  description(): string {
    return "Some simple coffee";
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  abstract cost(): number;

  abstract description(): string;
}

class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }
  cost(): number {
    return this.coffee.cost() + 2;
  }
  description(): string {
    return this.coffee.description() + " " + "with milk";
  }
}

// Client code
let coffee: Coffee = new SimpleCoffee();

coffee = new MilkDecorator(coffee);

console.log(`Cost: ${coffee.cost()}`);

// Real world implementation

interface ServerRequest {
  handle(request: any): void;
}

class BaseServer implements ServerRequest {
  handle(request: any): void {
    console.log("Handling request ...", request``);
  }
}

abstract class ServerRequestDecorator implements ServerRequest {
  constructor(protected serverRequest: ServerRequest) {}

  abstract handle(request: any): void;
}

class LoggingMiddleware extends ServerRequestDecorator {
  constructor(serverRequest: ServerRequest) {
    super(serverRequest);
  }

  handle(request: any): void {
    console.log("Logging Request: ", request);

    this.serverRequest.handle(request);
  }
}

class AuthMiddleware extends ServerRequestDecorator {
  constructor(serverRequest: ServerRequest) {
    super(serverRequest);
  }
  handle(request: any): void {
    console.log("AuthMiddleware Request: ", request);

    if (request.isAuth) {
      console.log("Request is authenticated");

      this.serverRequest.handle(request);
    } else {
      console.log("Unauthorised Access");
    }
  }
}

// Client code
const request = {
  isAuth: true,
  body: "Hello world",
};

let server: ServerRequest = new BaseServer();

server.handle(request);
server = new LoggingMiddleware(server);
server.handle(request);
