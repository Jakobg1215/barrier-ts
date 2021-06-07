import type Server from '../../../server';
import PlayerAbilitiesPacket from '../../packets/Play/serverbound/PlayerAbilitiesPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class PlayerAbilitiesHandler implements Handler<PlayerAbilitiesPacket> {
    public id = PlayServerbound.PlayerAbilities;

    public handle(_packet: PlayerAbilitiesPacket, _server: Server, _player: PlayerConnection) {}
}
