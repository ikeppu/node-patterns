// BUILDER PATTERN

interface Builder {
  setPartA(): void;
  setPartB(): void;
  setPartC(): void;
}

class Product {
  private parts: string[] = [];

  public add(part: string): void {
    this.parts.push(part);
  }

  public listParts(): void {
    console.log(`Product Parts: ${this.parts.join(", ")}`);
  }
}

class ConcreteBuilder implements Builder {
  private product!: Product;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.product = new Product();
  }

  setPartA(): void {
    this.product.add("PartA");
  }

  setPartB(): void {
    this.product.add("PartB");
  }

  setPartC(): void {
    this.product.add("PartC");
  }

  public getProduct(): Product {
    let result = this.product;
    this.reset();
    return result;
  }
}

class Director {
  private builder!: Builder;

  public setBuiler(builder: Builder): void {
    this.builder = builder;
  }

  buildMinimumProduct(): void {
    this.builder.setPartA();
  }

  public buildFullProduct(): void {
    this.builder.setPartA();
    this.builder.setPartB();
    this.builder.setPartC();
  }
}

const builder = new ConcreteBuilder();
const director = new Director();
director.setBuiler(builder);

director.buildMinimumProduct();
let minProdut = builder.getProduct();

// When to use

// Real World Implementation

interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

class Customer implements ICustomer {
  constructor(
    public firstName,
    public lastName,
    public email,
    public phoneNumber
  ) {}
}

interface ICustomerBuilder {
  setFirstName(firstName: string): ICustomerBuilder;
  setLastName(lastName: string): ICustomerBuilder;
  setEmail(email: string): ICustomerBuilder;
  setPhoneNumber(phoneNumber: string): ICustomerBuilder;
  build(): ICustomer;
}

class CustomerBuilder implements ICustomerBuilder {
  private firstName: string = "";
  private lastName: string = "";
  private email: string = "";
  private phoneNumber: string = "";

  setFirstName(firstName: string): ICustomerBuilder {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName: string): ICustomerBuilder {
    this.lastName = lastName;
    return this;
  }

  setEmail(email: string): ICustomerBuilder {
    this.email = email;
    return this;
  }

  setPhoneNumber(phoneNumber: string): ICustomerBuilder {
    this.phoneNumber = phoneNumber;
    return this;
  }

  build(): ICustomer {
    return new Customer(
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber
    );
  }
}

class CustomerDirector {
  constructor(private builder: ICustomerBuilder) {}

  buildMinimalCustomer(
    firstName: string,
    lastName: string,
    email: string
  ): ICustomer {
    return this.builder
      .setFirstName(firstName)
      .setLastName(lastName)
      .setEmail(email)
      .build();
  }
}

const customerBuilder: ICustomerBuilder = new CustomerBuilder();
const customerDirector: CustomerDirector = new CustomerDirector(
  customerBuilder
);

const minCustomer = customerDirector.buildMinimalCustomer(
  "John",
  "Doe",
  "test@example.com"
);
