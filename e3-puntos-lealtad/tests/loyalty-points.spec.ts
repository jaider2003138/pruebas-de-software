import { describe, it, expect,test } from "vitest";
import { LoyaltyPoints } from "../src/domain/loyalti-points";
import { BusinessError } from "../src/domain/errors";

describe("LoyaltyPoints", () => {
  //test("should start with initial points", () => {
    // Arrange
    const lp = new LoyaltyPoints(100);

    // Act
    const points = lp.getPoints();

    // Assert
    expect(points).toBe(100);
  //});

  it("should throw error if initial points is negative", () => {
    expect(() => new LoyaltyPoints(-1)).toThrowError(BusinessError);
    expect(() => new LoyaltyPoints(-1)).toThrow(/initial points cannot be negative/i);
  });

  it("should accumulate points", () => {
    // Arrange
    const lp = new LoyaltyPoints(0);

    // Act
    lp.accumulate(50);

    // Assert
    expect(lp.getPoints()).toBe(50);
  });

  it("should throw error if accumulate <= 0", () => {
    const lp = new LoyaltyPoints(0);
    expect(() => lp.accumulate(0)).toThrow(/greater than 0/i);
    expect(() => lp.accumulate(-5)).toThrow(/greater than 0/i);
  });

  it("should redeem points", () => {
    // Arrange
    const lp = new LoyaltyPoints(100);

    // Act
    lp.redeem(40);

    // Assert
    expect(lp.getPoints()).toBe(60);
  });

  it("should throw error if redeem <= 0", () => {
    const lp = new LoyaltyPoints(100);
    expect(() => lp.redeem(0)).toThrow(/greater than 0/i);
    expect(() => lp.redeem(-1)).toThrow(/greater than 0/i);
  });

  it("should throw error if redeem more than available", () => {
    const lp = new LoyaltyPoints(10);
    expect(() => lp.redeem(11)).toThrowError(BusinessError);
    expect(() => lp.redeem(11)).toThrow(/insufficient points/i);
    expect(lp.getPoints()).toBe(10);
  });

  it("should allow at most 3 accumulations per day", () => {
    // Arrange: congelamos el 'now' en un mismo día
    const fixedDate = new Date("2026-02-25T10:00:00.000Z");
    const now = () => fixedDate;

    const lp = new LoyaltyPoints(0, now);

    // Act
    lp.accumulate(10);
    lp.accumulate(10);
    lp.accumulate(10);

    // Assert
    expect(lp.getPoints()).toBe(30);

    // 4ta acumulación el mismo día debe fallar
    expect(() => lp.accumulate(10)).toThrow(/daily accumulation limit reached/i);
    expect(lp.getPoints()).toBe(30);
  });

  it("should reset daily accumulation count on a new day", () => {
    // Arrange: vamos a cambiar el día
    let current = new Date("2026-02-25T10:00:00.000Z");
    const now = () => current;

    const lp = new LoyaltyPoints(0, now);

    // Act: 3 acumulaciones en día 1
    lp.accumulate(5);
    lp.accumulate(5);
    lp.accumulate(5);

    // Cambia al día siguiente
    current = new Date("2026-02-26T10:00:00.000Z");

    // Assert: debe permitir acumular otra vez
    lp.accumulate(5);
    expect(lp.getPoints()).toBe(20);
  });
});