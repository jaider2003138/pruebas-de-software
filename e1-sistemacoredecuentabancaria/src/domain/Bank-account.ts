import { BussinesError } from "./errors";
import type { Movement} from "./types";

export class BankAccount {
    private balance:number;
    private movements:Movement[];

    constructor(initialBalance: number){
        if(initialBalance<0){
            throw new BussinesError("initial balance cannot be negative");
        }
        this.balance = initialBalance;
        this.movements = [];

        //registrar apertura
        this.movements.push({
            type: "OPEN",
            amount: initialBalance,
            balanceAfter: this.balance,
            date: new Date(),
        });
    }

    deposit(amount: number): void {
    if (amount <= 0) {
      throw new BussinesError("Deposit amount must be greater than 0");
    }

    this.balance += amount;

    this.movements.push({
      type: "DEPOSIT",
      amount,
      balanceAfter: this.balance,
      date: new Date(),
    });
  }

   withdraw(amount: number): void {
    if (amount <= 0) {
      throw new BussinesError("Withdraw amount must be greater than 0");
    }

    if (amount > this.balance) {
      throw new BussinesError("Insufficient funds");
    }

    this.balance -= amount;

    this.movements.push({
      type: "WITHDRAW",
      amount,
      balanceAfter: this.balance,
      date: new Date(),
    });
  }

  getBalance(): number {
    return this.balance;
  }

  getMovements(): Movement[] {
    // Copia para que desde afuera no te modifiquen el historial
    return [...this.movements];
  }
  
}

