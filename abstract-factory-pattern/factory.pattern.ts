// Abstract Factory Pattern

interface IProductA {
  operationA(): string;
}

interface IProductB {
  operationB(): string;
  combinedOperation(collaborator: IProductA): string;
}

interface IFactory {
  createProductA(): IProductA;
  createProductB(): IProductB;
}

class ProductA implements IProductA {
  operationA(): string {
    return "This is result of Operation A";
  }
}

class ProductB implements IProductB {
  operationB(): string {
    return "This is the result of Operation B";
  }
  combinedOperation(collaborator: IProductA): string {
    const result = collaborator.operationA();

    return `The result of Product B with (${result})`;
  }
}

class Factory implements IFactory {
  createProductA(): IProductA {
    return new ProductA();
  }
  createProductB(): IProductB {
    return new ProductB();
  }
}

// Client Code

const factory = new Factory();

const productA = factory.createProductA();
const productB = factory.createProductB();

// productB.combinedOperation(productA);

// Real World

interface Button {
  render(): void;
  onCLick(f: Function): void;
}

interface Checkbox {
  render(): void;
  toggle(): void;
}

interface GUIFactory {
  createButton(): Button;
  createCheckbox(button: Button): Checkbox;
}

class WindowsButton implements Button {
  render(): void {
    console.log("Render a button in Windows style");
  }
  onCLick(f: Function): void {
    console.log("Windows button was clicked");
    f();
  }
}

class WindowsCheckbox implements Checkbox {
  constructor(private button: Button) {}

  render(): void {
    console.log("Render a checkbox in Windows Style");
  }

  toggle(): void {
    this.button.onCLick(() => {
      console.log("Windows checkbox toggled");
    });
  }
}

class MacosButton implements Button {
  render(): void {
    console.log("Render a button in Macos style");
  }
  onCLick(f: Function): void {
    console.log("Macos button was clicked");
    f();
  }
}

class MacosCheckbox implements Checkbox {
  constructor(private button: Button) {}

  render(): void {
    console.log("Render a checkbox in Macos Style");
  }

  toggle(): void {
    this.button.onCLick(() => {
      console.log("Macos checkbox toggled");
    });
  }
}
