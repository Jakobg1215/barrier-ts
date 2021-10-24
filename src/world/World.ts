import type BaseEntity from './entity/BaseEntity';

export default class World {
    private worldIdGenerator = 0;
    private readonly worldEntities: Map<number, BaseEntity> = new Map();

    public giveUniqueId(): number {
        return this.worldIdGenerator++;
    }

    public get entities(): Map<number, BaseEntity> {
        return this.worldEntities;
    }
}
