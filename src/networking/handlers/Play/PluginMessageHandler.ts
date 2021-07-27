import type Server from '../../../server';
import type PluginMessagePacket from '../../packets/Play/serverbound/PluginMessagePacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class PluginMessageHandler implements Handler<PluginMessagePacket> {
    public id = PlayServerbound.PluginMessage;

    public handle(_packet: PluginMessagePacket, _server: Server, _player: PlayerConnection) {}
}
