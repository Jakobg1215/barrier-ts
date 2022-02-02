export default interface ServerStatus {
    description?: string;
    players: Players;
    version: Version;
    favicon?: string;
}

interface Players {
    max: number;
    online: number;
    sample?: PlayersSample[];
}

interface PlayersSample {
    id: string;
    name: string;
}

interface Version {
    name: string;
    protocol: number;
}
