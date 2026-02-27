import { BusinessError } from "./errors";

type NowFn = () => Date;

export class LoyaltyPoints {
  private points: number;
  private now: NowFn;

  // Guardamos cuántas acumulaciones se han hecho por fecha (YYYY-MM-DD)
  private accumulationsByDay: Map<string, number>;

  constructor(initialPoints: number = 0, now: NowFn = () => new Date()) {
    if (initialPoints < 0) {
      throw new BusinessError("Initial points cannot be negative");
    }

    this.points = initialPoints;
    this.now = now;
    this.accumulationsByDay = new Map();
  }

  accumulate(amount: number): void {
    if (amount <= 0) {
      throw new BusinessError("Accumulate amount must be greater than 0");
    }

    const dayKey = this.getDayKey(this.now());
    const currentCount = this.accumulationsByDay.get(dayKey) ?? 0;

    if (currentCount >= 3) {
      throw new BusinessError("Daily accumulation limit reached");
    }

    this.points += amount;
    this.accumulationsByDay.set(dayKey, currentCount + 1);
  }

  redeem(amount: number): void {
    if (amount <= 0) {
      throw new BusinessError("Redeem amount must be greater than 0");
    }

    if (amount > this.points) {
      throw new BusinessError("Insufficient points");
    }

    this.points -= amount;
  }

  getPoints(): number {
    return this.points;
  }

  // Helper privado: convertir Date -> "YYYY-MM-DD"
  private getDayKey(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
}