export interface Target {
    uuid: string;
    name: string;
    health: number;
    damage(dmgAmount: number): void;
    heal(healAmount: number): void;
}
