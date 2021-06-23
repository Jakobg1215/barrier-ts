import type Server from '../../../server';
import Packet from '../../packets/Packet';
import type EntityActionPacket from '../../packets/Play/serverbound/EntityActionPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class EntityActionHandler implements Handler<EntityActionPacket> {
    public id = PlayServerbound.EntityAction;

    public async handle(packet: EntityActionPacket, server: Server, _player: PlayerConnection) {
        const EntityMetadata = new Packet();
        EntityMetadata.writeVarInt(packet.EntityID);
        switch (packet.ActionID) {
            case ActionID.Startsneaking: {
                const pk = new Packet();
                pk.writeVarInt(packet.EntityID);
                pk.writeUnsignedByte(0);
                pk.writeVarInt(0);
                pk.writeByte(2);
                pk.writeUnsignedByte(6);
                pk.writeVarInt(18);
                pk.writeVarInt(5);
                pk.writeUnsignedByte(255);
                await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityMetadata, [packet.EntityID]);
                break;
            }
            case ActionID.Stopsneaking: {
                const pk = new Packet();
                pk.writeVarInt(packet.EntityID);
                pk.writeUnsignedByte(0);
                pk.writeVarInt(0);
                pk.writeByte(0);
                pk.writeUnsignedByte(6);
                pk.writeVarInt(18);
                pk.writeVarInt(0);
                pk.writeUnsignedByte(255);
                await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityMetadata, [packet.EntityID]);
                break;
            }
        }
    }
}

enum ActionID {
    Startsneaking,
    Stopsneaking,
    Leavebed,
    Startsprinting,
    Stopsprinting,
    Startjumpwithhorse,
    Stopjumpwithhorse,
    Openhorseinventory,
    Startflyingwithelytra,
}
