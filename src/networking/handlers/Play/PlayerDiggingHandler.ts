import type Server from '../../../server';
import type PlayerDiggingPacket from '../../packets/Play/serverbound/PlayerDiggingPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class PlayerDiggingHandler implements Handler<PlayerDiggingPacket> {
    public id = PlayServerbound.PlayerDigging;

    public handle(_packet: PlayerDiggingPacket, _server: Server, _player: PlayerConnection) {}
}
