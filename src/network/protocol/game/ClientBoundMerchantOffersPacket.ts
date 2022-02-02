import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundMerchantOffersPacket implements ClientBoundPacket {
    public constructor(
        public containerId: number,
        public offers: any,
        public villagerLevel: number,
        public villagerXp: number,
        public showProgress: boolean,
        public canRestock: boolean,
    ) {}

    public write(_packet: DataBuffer): DataBuffer {
        throw new Error('Method not implemented.'); // TODO: Implement data for ClientBoundMerchantOffersPacket
    }
}
