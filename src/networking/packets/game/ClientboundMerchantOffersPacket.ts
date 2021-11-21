import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundMerchantOffersPacket implements ClientboundPacket {
    public constructor(
        public containerId: number,
        public offers: any,
        public villagerLevel: number,
        public villagerXp: number,
        public showProgress: boolean,
        public canRestock: boolean,
    ) {}
    // TODO: Implement data for ClientboundMerchantOffersPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
