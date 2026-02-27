export type MovementType = "OPEN" | "DEPOSIT" | "WITHDRAW";

export interface Movement {
    type: MovementType;
    amount: number;
    balanceAfter: number;
    date:Date;
}