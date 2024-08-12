// Dependency Inversion Principle

class MySqlDatabase {
  save(data: string): void {}
}

class HighLevelModule {
  constructor(private database: MySqlDatabase) {}

  execute(data: string): void {
    this.database.save(data);
  }
}
