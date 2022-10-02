import type BarrierTs from '../BarrierTs';
import Chat, { ChatType } from '../types/classes/Chat';
import type Connection from './Connection';
import LoginPacketListener from './LoginPacketListener';
import type PacketListener from './PacketListener';
import { ConnectionProtocol } from './protocol/ConnectionProtocol';
import type ClientIntentionPacket from './protocol/handshake/ClientIntentionPacket';
import StatusPacketListener from './StatusPacketListener';

export default class HandshakePacketListener implements PacketListener {
    public constructor(private readonly server: BarrierTs, private readonly connection: Connection) {}

    public handleIntention(intention: ClientIntentionPacket): void {
        switch (intention.intention) {
            case ConnectionProtocol.LOGIN: {
                this.connection.setProtocol(ConnectionProtocol.LOGIN);
                if (intention.protocolVersion !== this.server.minecraftVersion.protocol) {
                    if (intention.protocolVersion < this.server.minecraftVersion.protocol)
                        this.connection.disconnect(new Chat(ChatType.TRANSLATE, 'multiplayer.disconnect.outdated_client'));
                    else this.connection.disconnect(new Chat(ChatType.TRANSLATE, 'multiplayer.disconnect.outdated_server'));
                } else this.connection.setListener(new LoginPacketListener(this.server, this.connection));
                break;
            }

            case ConnectionProtocol.STATUS: {
                this.connection.setProtocol(ConnectionProtocol.STATUS);
                this.connection.setListener(new StatusPacketListener(this.server, this.connection));
                break;
            }

            default: {
                throw new Error('Invalid intention');
            }
        }
    }
}
