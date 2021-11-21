export default interface PlayerSave {
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
    };
    isFlying: boolean;
    heldItemSlot: number;
    inventory: {
        slot: number;
        id: number;
        count: number;
        nbt: number[];
    }[];
}
