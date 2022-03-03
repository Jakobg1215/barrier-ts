import { FieldType } from '../../network/protocol/game/ClientBoundSetEntityDataPacket';
import Entity from './Entity';

export default class LivingEntity extends Entity {
    public health = 20;

    public constructor() {
        super();
        this.synchedData.define(9, FieldType.FLOAT, 20);
    }

    public override tick(): void {
        super.tick();
    }

    public damage(amount: number) {
        this.health -= amount;
        this.synchedData.set(9, this.health);
    }

    public get isDead(): boolean {
        return this.health <= 0;
    }
}
