import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';
import { PlayerInfoPlayer } from '../../../types/PacketFieldArguments';

export default class PlayerInfoPacket extends Packet {
    public static readonly id = PlayClientbound.PlayerInfo;

    public Action!: number;
    public NumberOfPlayers!: number;
    public Player!: PlayerInfoPlayer[];

    public encrypt() {
        this.writeVarInt(this.Action);
        this.writeVarInt(this.NumberOfPlayers);
        for (let playerindex = 0; playerindex < this.NumberOfPlayers; playerindex++) {
            this.writeUUID(this.Player[playerindex].UUID);
            switch (this.Action) {
                case Action.addplayer: {
                    this.writeString(this.Player[playerindex].Name ?? 'UknownPlayer');
                    this.writeVarInt(this.Player[playerindex].NumberOfProperties ?? 0);
                    /*
                    for (
                        let propertyindex = 0;
                        propertyindex < (this.Player[playerindex].NumberOfProperties ?? 0);
                        propertyindex++
                    ) {
                        this.writeString(this.Player[playerindex].Property![propertyindex].Name);
                        this.writeString(this.Player[playerindex].Property![propertyindex].Value);
                        this.writeBoolean(this.Player[playerindex].Property![propertyindex].IsSigned);
                        if (this.Player[playerindex].Property![propertyindex].IsSigned) {
                            this.writeString(this.Player[playerindex].Property![propertyindex].Signature!);
                        }
                    }*/
                    this.writeVarInt(this.Player[playerindex].Gamemode ?? 1);
                    this.writeVarInt(this.Player[playerindex].Ping ?? 1000);
                    this.writeBoolean(this.Player[playerindex].HasDisplayName ?? false);
                    if (this.Player[playerindex].HasDisplayName) {
                        this.writeString(this.Player[playerindex].DisplayName!);
                    }
                    break;
                }
                case Action.updategamemode:
                    this.writeVarInt(this.Player[playerindex].Gamemode ?? 1);
                    break;
                case Action.updatelatency:
                    this.writeVarInt(this.Player[playerindex].Ping ?? 1000);
                    break;
                case Action.updatedisplayname:
                    this.writeBoolean(this.Player[playerindex].HasDisplayName ?? false);
                    if (this.Player[playerindex].HasDisplayName) {
                        this.writeString(this.Player[playerindex].DisplayName!);
                    }
                    break;
                case Action.removeplayer:
                    break;
            }
        }
    }
}

enum Action {
    addplayer,
    updategamemode,
    updatelatency,
    updatedisplayname,
    removeplayer,
}
