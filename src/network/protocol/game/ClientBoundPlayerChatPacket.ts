import type Chat from '../../../types/classes/Chat';
import type UUID from '../../../types/classes/UUID';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundPlayerChatPacket implements ClientBoundPacket {
    public constructor(
        public previousSignature: Buffer | null,
        public sender: UUID,
        public headerSignature: Buffer,
        public content: string,
        public message: Chat | null,
        public timeStamp: bigint,
        public salt: bigint,
        public lastSeen: { profileId: UUID; lastSignature: Buffer }[],
        public unsignedContent: Chat | null,
        public type: Type,
        public mask: bigint[] | null,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        if (this.previousSignature) {
            packet.writeBoolean(true);
            packet.writeByteArray(this.previousSignature);
        } else packet.writeBoolean(false);
        packet.writeUUID(this.sender);
        packet.writeByteArray(this.headerSignature);
        packet.writeString(this.content, 256);
        if (this.message) {
            packet.writeBoolean(true);
            packet.writeChat(this.message);
        } else packet.writeBoolean(false);
        packet.writeLong(this.timeStamp);
        packet.writeLong(this.salt);
        packet.writeVarInt(this.lastSeen.length);
        for (const { profileId, lastSignature } of this.lastSeen) {
            packet.writeUUID(profileId);
            packet.writeByteArray(lastSignature);
        }
        if (this.unsignedContent) {
            packet.writeBoolean(true);
            packet.writeChat(this.unsignedContent);
        } else packet.writeBoolean(false);
        packet.writeVarInt(this.type);
        if (this.mask) {
            packet.writeBoolean(true);
            packet.writeVarInt(this.mask.length);
            for (const mask of this.mask) packet.writeLong(mask);
        } else packet.writeBoolean(false);
        return packet;
    }
}

export enum Type {
    PASS_THROUGH,
    FULLY_FILTERED,
    PARTIALLY_FILTERED,
}
