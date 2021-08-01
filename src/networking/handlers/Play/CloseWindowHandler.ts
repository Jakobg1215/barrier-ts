import type Server from '../../../server';
import type CloseWindowPacket from '../../packets/Play/serverbound/CloseWindowPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class CloseWindowHandler implements Handler<CloseWindowPacket> {
    public id = PlayServerbound.CloseWindow;

    public handle(_packet: CloseWindowPacket, _server: Server, _player: PlayerConnection) {}
}
