// BankAccountClass
// Depositing
// Withdrawing

// # Private
// Balance - hidden - encapsulated

class BackAccount {
  private _balance: number;

  constructor(initialBalance: number) {
    this._balance = initialBalance;
  }

  // Method Deposit Money
  public deposit(amount: number): void {
    if (amount < 0) {
      console.log("Invalid deposit Amount");

      return;
    }

    this._balance += amount;
  }

  //    Method to Withdraw Money
  public withdraw(amount: number): void {
    if (amount < 0) {
      console.log("Invalid withdrawal Amount");

      return;
    }

    if (this._balance - amount < 0) {
      console.log("Insufficient Funds");

      return;
    }

    this._balance -= amount;
  }

  //   Getter for ballance
  public get balance(): number {
    return this._balance;
  }
}

const myAccount = new BackAccount(1000);

myAccount.withdraw(50);

console.log("Balance :", myAccount.balance);
