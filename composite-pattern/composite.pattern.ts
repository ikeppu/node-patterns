// Composite pattern
interface Employee {
  getName(): string;
  getSalary(): number;
  getRole(): string;
}

class Developer implements Employee {
  constructor(private name: string, private salary: number) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getRole(): string {
    return Developer.name;
  }
}

class Designer implements Employee {
  constructor(private name: string, private salary: number) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getRole(): string {
    return Designer.name;
  }
}

interface CompositeEmployee extends Employee {
  addEmployee(employee: Employee): void;
  removeEmployee(employee: Employee): void;
  getEmployees(): Employee[];
}

class Manager implements CompositeEmployee {
  private employees: Employee[] = [];

  constructor(private name: string, private salary: number) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getRole(): string {
    return Manager.name;
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }
  removeEmployee(employee: Employee): void {
    let index = this.employees.indexOf(employee);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }
  getEmployees(): Employee[] {
    return this.employees;
  }
}

// CLient Code
let dev1 = new Developer("John Doe", 12000);
let dev2 = new Developer("Jane Doe", 15000);
let designer = new Designer("Mark", 10000);

let manager = new Manager("Michael", 25000);

// Real world implementation

interface FileSystemComponent {
  getName(): string;
  getSize(): number;
}

class FIleComponent implements FileSystemComponent {
  constructor(private name: string, private size: number) {}

  getName(): string {
    return this.name;
  }
  getSize(): number {
    return this.size;
  }
}

interface CompositeFileSystem extends FileSystemComponent {
  addComponent(component: FileSystemComponent): void;
  removeComponent(component: FileSystemComponent): void;
  getComponents(): FileSystemComponent[];
}

class Folder implements CompositeFileSystem {
  private components: FileSystemComponent[] = [];

  constructor(private name: string) {}

  addComponent(component: FileSystemComponent): void {
    this.components.push(component);
  }

  removeComponent(component: FileSystemComponent): void {
    const index = this.components.indexOf(component);

    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  getComponents(): FileSystemComponent[] {
    return this.components;
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.components.reduce((x, component) => {
      return x + component.getSize();
    }, 0);
  }
}

// CLient code
let file1 = new FIleComponent("file1.txt", 500);
let file2 = new FIleComponent("file2.txt", 800);
let file3 = new FIleComponent("file3.txt", 1200);

let folder = new Folder("My foolder");

folder.addComponent(file1);
folder.addComponent(file2);
folder.addComponent(file3);
