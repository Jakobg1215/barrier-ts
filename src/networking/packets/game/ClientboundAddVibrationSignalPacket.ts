import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundAddVibrationSignalPacket implements ClientboundPacket {
    public constructor(public vibrationPath: any) {}
    // TODO: Implement data for ClientboundAddVibrationSignalPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
