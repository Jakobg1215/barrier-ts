export default class World {
    private entityIDs: number = 0;

    public getId() {
        return (this.entityIDs += 1);
    }
}
