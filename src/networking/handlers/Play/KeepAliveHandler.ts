import type PlayerConnection from '../../players/PlayerConnection';
import type Handler from '../Handler';
import type KeepAlivePacket from '../../packets/Play/serverbound/KeepAlivePacket';
import { PlayServerbound } from '../../types/PacketIds';
import type Server from '../../../server';

export default class KeepAliveHandler implements Handler<KeepAlivePacket> {
    public id = PlayServerbound.KeepAlive;

    public handle(_packet: KeepAlivePacket, _server: Server, _player: PlayerConnection) {}
}
