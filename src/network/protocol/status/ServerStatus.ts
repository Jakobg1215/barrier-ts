export default interface ServerStatus {
    description?: string;
    players?: Players;
    version?: Version;
    favicon?: string;
    previewsChat?: boolean;
    enforcesSecureChat?: boolean;
}

export interface Players {
    max: number;
    online: number;
    sample?: PlayersSample[];
}

export interface PlayersSample {
    id: string;
    name: string;
}

export interface Version {
    name: string;
    protocol: number;
}
