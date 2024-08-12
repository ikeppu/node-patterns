// Liskov Substitution Principle

abstract class Shape {
  abstract calculateArea(): number;
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
  }
  calculateArea(): number {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(public side: number) {
    super();
  }

  calculateArea(): number {
    return this.side * this.side;
  }
}

// ====== Client Code here ======

function area(shape: Shape): number {
  return shape.calculateArea();
}

let rectangle = new Rectangle(10, 12);
let square = new Square(8);

area(rectangle);
area(square);

// Real world application

// Payment Processor
// Credit Card
// Debit Card
// Paypal

abstract class PaymentProcessor {
  abstract processPayment(amount: number): void;
}

class CreditCardProccesor extends PaymentProcessor {
  processPayment(amount: number): void {
    console.log("Processing Credit Card Payments - Amount");
  }
}
