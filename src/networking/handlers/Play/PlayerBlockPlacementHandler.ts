import type Server from '../../../server';
import PlayerBlockPlacementPacket from '../../packets/Play/serverbound/PlayerBlockPlacementPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class PlayerBlockPlacementHandler implements Handler<PlayerBlockPlacementPacket> {
    public id = PlayServerbound.PlayerBlockPlacement;

    public async handle(_packet: PlayerBlockPlacementPacket, _server: Server, _player: PlayerConnection) {}
}
