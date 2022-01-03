import type ClientboundSetEntityDataPacket from '../../networking/packets/game/ClientboundSetEntityDataPacket';
import type BlockPos from '../../types/classes/BlockPos';
import type Slot from '../../types/classes/Slot';
import { Hand } from '../../types/enums/Hand';
import Entity from './Entity';

export default class LivingEntity extends Entity {
    public useingHand = false;
    public activeHand = Hand.MAIN_HAND;
    public riptideSpin = false;
    public health = 1;
    public effectColor = 0;
    public ambientEffect = false;
    public arrows = 0;
    public stingers = 0;
    public bedpos: null | BlockPos = null;
    public inventory = new Map<number, Slot>();

    public override updataMetaData(): ClientboundSetEntityDataPacket {
        const prepacket = super.updataMetaData();
        let flags = 0;
        if (this.useingHand) flags |= 0x01;
        if (this.activeHand === Hand.OFF_HAND) flags |= 0x02;
        if (this.riptideSpin) flags |= 0x04;
        prepacket.packedItems.push(
            { type: 0, index: 8, value: flags },
            { type: 2, index: 9, value: this.health },
            { type: 1, index: 10, value: this.effectColor },
            { type: 7, index: 11, value: this.ambientEffect },
            { type: 1, index: 12, value: this.arrows },
            { type: 1, index: 13, value: this.stingers },
            { type: 10, index: 14, value: this.bedpos },
        );
        return prepacket;
    }
}
