import type DataBuffer from '../../DataBuffer';
import type LoginPacketListener from '../../LoginPacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';
import GameProfile from './GameProfile';

export default class ServerBoundHelloPacket implements ServerBoundPacket<LoginPacketListener> {
    public readonly gameProfile: GameProfile;

    public constructor(data: DataBuffer) {
        this.gameProfile = new GameProfile(data.readString(16));
    }

    public handle(handler: LoginPacketListener): void {
        handler.handleHello(this);
    }
}
