import { CardObjMetadata } from '../../game/Player/Card';

export interface CardInfo {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    code: string;
    metadata: CardObjMetadata;
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
