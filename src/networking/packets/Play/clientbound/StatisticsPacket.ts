import { StatisticsStatistic } from '../../../types/PacketFieldArguments';
import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class StatisticsPacket extends Packet {
    public static readonly id = PlayClientbound.Statistics;

    public Count!: number;
    public Statistic!: StatisticsStatistic[];

    public encrypt() {
        this.writeVarInt(this.Count);
        for (let index = 0; index < this.Count; index++) {
            this.writeVarInt(this.Statistic[index].CategoryID);
            this.writeVarInt(this.Statistic[index].StatisticID);
            this.writeVarInt(this.Statistic[index].Value);
        }
    }
}
