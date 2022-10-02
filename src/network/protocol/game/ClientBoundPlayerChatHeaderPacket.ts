import type DataBuffer from '../../DataBuffer';
import type { Buffer } from 'node:buffer';
import type ClientBoundPacket from '../ClientBoundPacket';
import type UUID from '../../../types/classes/UUID';

export default class ClientBoundPlayerChatHeaderPacket implements ClientBoundPacket {
    public constructor(public previousSignature: Buffer | null, public sender: UUID, public headerSignature: Buffer, public bodyDigest: Buffer) {}

    public write(packet: DataBuffer): DataBuffer {
        if (this.previousSignature) {
            packet.writeBoolean(true);
            packet.append(this.previousSignature);
        } else packet.writeBoolean(false);
        packet.writeUUID(this.sender);
        packet.writeByteArray(this.headerSignature);
        packet.writeByteArray(this.bodyDigest);
        return packet;
    }
}
