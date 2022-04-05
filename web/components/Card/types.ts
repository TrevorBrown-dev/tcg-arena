export type CardRecordPart = {
    amount: number;
    isFoil: boolean;
    card: {
        id: number;
        name: string;
        description: string;
        imageUrl?: string;
    };
};

export type CardObj = {
    id: number;
    uuid?: string;
    name: string;
    description: string;
    imageUrl: string;
    isFoil: boolean;
};

export type WithCardRecord = {
    cardRecord: CardRecordPart;
};

export type WithCardObj = {
    cardObj: CardObj;
};
