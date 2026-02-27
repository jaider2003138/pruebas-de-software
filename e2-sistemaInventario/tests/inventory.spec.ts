import { describe, it, expect } from "vitest";
import { Inventory } from "../src/domain/inventory";
import { BusinessError } from "../src/domain/errors";

describe("Inventory", () => {
  it("should create inventory with valid initial stock", () => {
    // Arrange
    const inventory = new Inventory(20);

    // Act
    const stock = inventory.getStock();

    // Assert
    expect(stock).toBe(20);
  });

  it("should throw error if initial stock is negative", () => {
    // Arrange + Act + Assert
    expect(() => new Inventory(-1)).toThrowError(BusinessError);
    expect(() => new Inventory(-1)).toThrow(/initial stock cannot be negative/i);
  });

  it("should add stock correctly", () => {
    // Arrange
    const inventory = new Inventory(10);

    // Act
    inventory.addStock(5);

    // Assert
    expect(inventory.getStock()).toBe(15);
  });

  it("should throw error if addStock <= 0", () => {
    // Arrange
    const inventory = new Inventory(10);

    // Act + Assert
    expect(() => inventory.addStock(0)).toThrow(/greater than 0/i);
    expect(() => inventory.addStock(-2)).toThrow(/greater than 0/i);
  });

  it("should reduce stock correctly", () => {
    // Arrange
    const inventory = new Inventory(10);

    // Act
    inventory.reduceStock(4);

    // Assert
    expect(inventory.getStock()).toBe(6);
  });

  it("should throw error if reduceStock <= 0", () => {
    // Arrange
    const inventory = new Inventory(10);

    // Act + Assert
    expect(() => inventory.reduceStock(0)).toThrow(/greater than 0/i);
    expect(() => inventory.reduceStock(-1)).toThrow(/greater than 0/i);
  });

  it("should throw error if reduce more than available stock", () => {
    // Arrange
    const inventory = new Inventory(5);

    // Act + Assert
    expect(() => inventory.reduceStock(6)).toThrowError(BusinessError);
    expect(() => inventory.reduceStock(6)).toThrow(/insufficient stock/i);
    // stock no cambia
    expect(inventory.getStock()).toBe(5);
  });

  it('should return "OK" when stock > 10', () => {
    // Arrange
    const inventory = new Inventory(11);

    // Act
    const status = inventory.getStatus();

    // Assert
    expect(status).toBe("OK");
  });

  it('should return "LOW" when stock is between 1 and 10', () => {
    // Arrange
    const inventory = new Inventory(10);

    // Act
    const status = inventory.getStatus();

    // Assert
    expect(status).toBe("LOW");
  });

  it('should return "OUT_OF_STOCK" when stock is 0', () => {
    // Arrange
    const inventory = new Inventory(0);

    // Act
    const status = inventory.getStatus();

    // Assert
    expect(status).toBe("OUT_OF_STOCK");
  });
});