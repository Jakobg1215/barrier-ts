export default interface GameProfile {
    name: string;
    uuid: string;
    properties: property[] | null;
}

export interface property {
    name: string;
    value: string;
    signature: string;
}
