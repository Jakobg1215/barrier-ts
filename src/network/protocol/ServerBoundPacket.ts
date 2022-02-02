import type PacketListener from '../PacketListener';

export default interface ServerBoundPacket<Listener extends PacketListener> {
    handle(handler: Listener): void;
}
