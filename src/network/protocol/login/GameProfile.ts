import UUID from '../../../types/classes/UUID';

export default class GameProfile {
    public readonly properties: property[] = [];

    public constructor(public name: string, public readonly id = UUID.createFakeUUID(name)) {}
}

export interface property {
    name: string;
    value: string;
    signature?: string;
}
