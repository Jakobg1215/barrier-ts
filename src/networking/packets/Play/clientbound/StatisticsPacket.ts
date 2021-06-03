import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';
import { StatisticsStatistic } from '../../../types/PacketFieldArguments';

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
