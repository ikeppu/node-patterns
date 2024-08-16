// Chain Dessign Pattern

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.nextHandler = handler;

    return handler;
  }

  handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return null;
  }
}

class MonkeyHandler extends AbstractHandler {
  handle(request: string): string | null {
    if (request === "Banana") {
      console.log(`Monkey I'll eat the ${request}`);
    }

    return super.handle(request);
  }
}

// Client code

// Real World
