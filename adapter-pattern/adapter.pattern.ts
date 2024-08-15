// Adapter Pattern
class Rectangle {
  constructor(private width: number, private height: number) {}

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public area(): number {
    return this.width * this.height;
  }
}

class Square {
  constructor(private side: number) {}

  getSide(): number {
    return this.side;
  }

  area(): number {
    return this.side * this.side;
  }
}

class SquareToRectacngleAdapter {
  constructor(private square: Square) {}

  public getWidth(): number {
    return this.square.getSide();
  }

  public getHeight(): number {
    return this.square.getSide();
  }

  public area(): number {
    return this.square.area();
  }
}

// CLient code
let square = new Square(5);
let adapter = new SquareToRectacngleAdapter(square);

console.log(adapter.getHeight());
console.log(adapter.getWidth());
console.log(adapter.area());

//  Real World
class MySQLDatabase {
  public connectToMySQl(uri: string): void {
    console.log("Connecting to MYSQL at ", uri);
  }

  public executeMySqlQuery(query: string): void {
    console.log(`Executing MySql Query ${query}`);
  }
}

class PostgresSQLDatabase {
  connectToPostgresSQL(uri: string): void {
    console.log(`Connecting to PostgresSQL ${uri}`);
  }

  public executePostgresSQL(query: string): void {
    console.log(`Executing PostgresSQL Query ${query}`);
  }
}

class DatabaseAdapter {
  constructor(private postgresSQL: PostgresSQLDatabase) {}

  public connectToMySQl(uri: string): void {
    this.postgresSQL.connectToPostgresSQL(uri);
  }

  public executeMySqlQuery(query: string): void {
    this.postgresSQL.executePostgresSQL(query);
  }
}

// client code
let database = new DatabaseAdapter(new PostgresSQLDatabase());
database.connectToMySQl("mysql://localhost:3306/mydb");
database.executeMySqlQuery(`SELECT * FROM * users`);
