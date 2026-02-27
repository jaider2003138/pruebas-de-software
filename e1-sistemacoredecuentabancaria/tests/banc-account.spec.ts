// tests/bank-account.spec.ts
import { describe, it, expect } from "vitest";
import { BankAccount } from "../src/domain/Bank-account";
import { BussinesError } from "../src/domain/errors";

describe("BankAccount", () => {
  it("should create an account with initial balance and register OPEN movement", () => {
    // Arrange
    const account = new BankAccount(1000);

    // Act
    const balance = account.getBalance();
    const movements = account.getMovements();

    // Assert
    expect(balance).toBe(1000);
    expect(movements).toHaveLength(1);
    expect(movements[0].type).toBe("OPEN");
    expect(movements[0].amount).toBe(1000);
    expect(movements[0].balanceAfter).toBe(1000);
  });

  it("should throw error if initial balance is negative", () => {
    // Arrange + Act + Assert
    expect(() => new BankAccount(-1)).toThrowError(BussinesError);
    expect(() => new BankAccount(-1)).toThrow("initial balance cannot be negative");
  });

  it("should deposit money, increase balance and register movement", () => {
    // Arrange
    const account = new BankAccount(1000);

    // Act
    account.deposit(500);

    // Assert
    expect(account.getBalance()).toBe(1500);

    const movements = account.getMovements();
    expect(movements).toHaveLength(2);
    expect(movements[1].type).toBe("DEPOSIT");
    expect(movements[1].amount).toBe(500);
    expect(movements[1].balanceAfter).toBe(1500);
  });

  it("should throw error if deposit is <= 0", () => {
    // Arrange
    const account = new BankAccount(1000);

    // Act + Assert
    expect(() => account.deposit(0)).toThrow("Deposit amount must be greater than 0");
    expect(() => account.deposit(-10)).toThrow("Deposit amount must be greater than 0");
  });

  it("should withdraw money, decrease balance and register movement", () => {
    // Arrange
    const account = new BankAccount(1000);

    // Act
    account.withdraw(200);

    // Assert
    expect(account.getBalance()).toBe(800);

    const movements = account.getMovements();
    expect(movements).toHaveLength(2);
    expect(movements[1].type).toBe("WITHDRAW");
    expect(movements[1].amount).toBe(200);
    expect(movements[1].balanceAfter).toBe(800);
  });

  it("should throw error if withdraw is <= 0", () => {
    // Arrange
    const account = new BankAccount(1000);

    // Act + Assert
    expect(() => account.withdraw(0)).toThrow("Withdraw amount must be greater than 0");
    expect(() => account.withdraw(-5)).toThrow("Withdraw amount must be greater than 0");
  });

  it("should throw error if withdraw is greater than balance (no negative balance ever)", () => {
    // Arrange
    const account = new BankAccount(100);

    // Act + Assert
    expect(() => account.withdraw(200)).toThrow("Insufficient funds");
    expect(account.getBalance()).toBe(100);

    // Y no debe registrar movimiento fallido:
    expect(account.getMovements()).toHaveLength(1);
  });
});