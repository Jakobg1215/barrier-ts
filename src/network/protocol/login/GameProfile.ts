import type UUID from '../../../types/classes/UUID';

export default class GameProfile {
    public readonly properties: property[] = [];

    public constructor(public readonly id: UUID | null, public name: string) {}

    public isComplete(): boolean {
        return this.id !== null;
    }
}

export interface property {
    name: string;
    value: string;
    signature: string;
}
