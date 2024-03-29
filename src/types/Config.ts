export default interface Config {
    port: number;
    host: string;
    debug: boolean;
    online: boolean;
    compression: number;
    serverName: string;
    maxplayers: number;
    motd: string;
    difficulty: number;
    icon: string;
    playerlisting: boolean;
    viewDistance: number;
    simulationDistance: number;
}
