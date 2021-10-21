import { randomUUID } from 'node:crypto';
import type GameProfile from '../../../types/GameProfile';
import type Packet from '../../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundHelloPacket implements ServerboundPacket {
    public gameProfile!: GameProfile;

    public read(data: Packet): this {
        this.gameProfile = {
            name: data.readString(),
            uuid: randomUUID(),
        };
        return this;
    }
}
