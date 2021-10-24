import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundPlayerInputPacket implements ServerboundPacket {
    public xxa!: number;
    public zza!: number;
    public isJumping!: boolean;
    public isShiftKeyDown!: boolean;

    public read(data: Packet): this {
        this.xxa = data.readFloat();
        this.zza = data.readFloat();
        const bitMask = data.readByte();
        this.isJumping = (bitMask & 1) > 0;
        this.isShiftKeyDown = (bitMask & 2) > 0;
        return this;
    }
}
