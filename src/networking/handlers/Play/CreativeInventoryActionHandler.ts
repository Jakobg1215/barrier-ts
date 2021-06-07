import type Server from '../../../server';
import type CreativeInventoryActionPacket from '../../packets/Play/serverbound/CreativeInventoryActionPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class CreativeInventoryActionHandler implements Handler<CreativeInventoryActionPacket> {
    public id = PlayServerbound.CreativeInventoryAction;

    public handle(_packet: CreativeInventoryActionPacket, _server: Server, _player: PlayerConnection) {}
}
