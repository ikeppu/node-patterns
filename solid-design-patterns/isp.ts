// Interface Segregation Principle

interface Printer {
  print(document: Document): void;
}

interface Scanner {
  scan(document: Document): void;
}

interface FaxMachine {
  fax(document: Document): void;
}

class MultiFunctionPrinter implements Printer, Scanner, FaxMachine {
  print(document: Document): void {
    throw new Error("Method not implemented.");
  }
  scan(document: Document): void {
    throw new Error("Method not implemented.");
  }
  fax(document: Document): void {
    throw new Error("Method not implemented.");
  }
}
