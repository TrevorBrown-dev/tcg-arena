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
export type WithCardRecord = {
    cardRecord: CardRecordPart;
};
