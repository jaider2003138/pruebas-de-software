import { BusinessError } from "./errors";

export type InventoryStatus = "OK" | "LOW" | "OUT_OF_STOCK";

export class Inventory {
  private stock: number;

  constructor(initialStock: number) {
    if (initialStock < 0) {
      throw new BusinessError("Initial stock cannot be negative");
    }
    this.stock = initialStock;
  }

  addStock(amount: number): void {
    if (amount <= 0) {
      throw new BusinessError("Amount to add must be greater than 0");
    }
    this.stock += amount;
  }

  reduceStock(amount: number): void {
    if (amount <= 0) {
      throw new BusinessError("Amount to reduce must be greater than 0");
    }
    if (amount > this.stock) {
      throw new BusinessError("Insufficient stock");
    }
    this.stock -= amount;
  }

  getStock(): number {
    return this.stock;
  }

  getStatus(): InventoryStatus {
    if (this.stock === 0) return "OUT_OF_STOCK";
    if (this.stock <= 10) return "LOW";
    return "OK";
  }
}