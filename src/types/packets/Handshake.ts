export default interface Handshake {
    ProtocolVersion: number,
    ServerAddress: string,
    ServerPort: number,
    NextState: number
}