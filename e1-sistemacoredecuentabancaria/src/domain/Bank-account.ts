import { BussinesError } from "./errors";
import type { Movement } from "./types";

export class BankAccount {
  private balance: number;
  private movements: Movement[];

  constructor(initialBalance: number) {
    this.validateInitialBalance(initialBalance);

    this.balance = initialBalance;
    this.movements = [];

    // registrar apertura
    this.registerMovement("OPEN", initialBalance);
  }

  deposit(amount: number): void {
    this.validateAmount(amount);

    this.balance += amount;
    this.registerMovement("DEPOSIT", amount);
  }

  withdraw(amount: number): void {
    this.validateAmount(amount);
    this.validateSufficientFunds(amount);

    this.balance -= amount;
    this.registerMovement("WITHDRAW", amount);
  }

  getBalance(): number {
    return this.balance;
  }

  getMovements(): Movement[] {
    return [...this.movements];
  }

  //refactorización
  private validateInitialBalance(initialBalance: number): void {
    if (initialBalance < 0) {
      throw new BussinesError("initial balance cannot be negative");
    }
  }

  private validateAmount(amount: number): void {
    if (amount <= 0) {
      throw new BussinesError("Amount must be greater than 0");
    }
  }

  private validateSufficientFunds(amount: number): void {
    if (amount > this.balance) {
      throw new BussinesError("Insufficient funds");
    }
  }

  private registerMovement(type: Movement["type"], amount: number): void {
    this.movements.push({
      type,
      amount,
      balanceAfter: this.balance,
      date: new Date(),
    });
  }
}