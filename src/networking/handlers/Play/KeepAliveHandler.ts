import type Server from '../../../server';
import type KeepAlivePacket from '../../packets/Play/serverbound/KeepAlivePacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class KeepAliveHandler implements Handler<KeepAlivePacket> {
    public id = PlayServerbound.KeepAlive;

    public handle(_packet: KeepAlivePacket, _server: Server, _player: PlayerConnection) {}
}
