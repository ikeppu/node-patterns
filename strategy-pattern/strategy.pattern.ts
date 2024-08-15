// Strategy pattern
interface PaymentStrategy {
  pay(amount: number): void;
}

class PayPalStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal`);
  }
}

class CredfitCardStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using CreditCard`);
  }
}

class BitCoindStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Bitcoin`);
  }
}

class ShoppingCard {
  private amount: number = 0;
  constructor(private paymentStrategy: PayPalStrategy) {}

  setPaymentStrategy(paymentStrategy: PayPalStrategy): void {
    this.paymentStrategy = paymentStrategy;
  }

  addToCard(value: number): void {
    this.amount += value;
  }

  checkout(): void {
    console.log(`Checkout proccessing...`);
    this.paymentStrategy.pay(this.amount);
    this.amount = 0;
  }
}

// client code

let cart = new ShoppingCard(new PayPalStrategy());

cart.addToCard(100);
cart.addToCard(170);
cart.addToCard(10);
cart.checkout();

cart.setPaymentStrategy(new BitCoindStrategy());
cart.addToCard(170);
cart.addToCard(10);
cart.checkout();

// Real World

interface FilterStrategy {
  apply(image: string): void;
}

class GrayscaleStrategy implements FilterStrategy {
  apply(image: string): void {
    console.log(`Apply ${image} using GrayscaleStrategy`);
  }
}

class SepiaStrategy implements FilterStrategy {
  apply(image: string): void {
    console.log(`Apply ${image} using SepiaStrategy`);
  }
}

class NegativeStrategy implements FilterStrategy {
  apply(image: string): void {
    console.log(`Apply ${image} using NegativeStrategy`);
  }
}

class ImageProcessor {
  constructor(private filterStrategy: FilterStrategy) {}

  setFilterStrategy(filterStrategy: FilterStrategy): void {
    this.filterStrategy = filterStrategy;
  }

  applyFilter(image: string): void {
    this.filterStrategy.apply(image);
  }
}

// client code
let imageProccessor: ImageProcessor = new ImageProcessor(
  new GrayscaleStrategy()
);

imageProccessor.applyFilter("tetetetes");
imageProccessor.setFilterStrategy(new NegativeStrategy());
imageProccessor.applyFilter("tetetetes");
