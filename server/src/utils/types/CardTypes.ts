export interface CardInfo {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    code: string;
}

export interface CardMetadata {
    validTargets?: string[];
    resources?: {
        name: string;
        amount: number;
    }[];
}

export interface Foilable {
    isFoil: boolean;
}
