export default interface GameProfile {
    name: string;
    uuid: string;
    properties: property[];
    legacy: boolean;
}

export interface property {
    name: string;
    value: string;
    signature: string;
}
