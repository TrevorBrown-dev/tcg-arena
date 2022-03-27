import { nanoid } from 'nanoid';

function Id<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        id: string = nanoid();
    };
}

@Id
export class WithId {
    id!: string;
}
