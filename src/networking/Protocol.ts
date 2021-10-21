import type Handler from './handlers/Handler';
import ClientIntentionHandler from './handlers/handshake/ClientIntentionHandler';
import CustomQueryHandler from './handlers/login/CustomQueryHandler';
import HelloHandler from './handlers/login/HelloHandler';
import KeyHandler from './handlers/login/KeyHandler';
import PingRequestHandler from './handlers/status/PingRequestHandler';
import StatusRequestHandler from './handlers/status/StatusRequestHandler';
import ServerboundClientIntentionPacket from './packets/handshake/ServerboundClientIntentionPacket';
import ServerboundCustomQueryPacket from './packets/login/ServerboundCustomQueryPacket';
import ServerboundHelloPacket from './packets/login/ServerboundHelloPacket';
import ServerboundKeyPacket from './packets/login/ServerboundKeyPacket';
import type ServerboundPacket from './packets/ServerboundPacket';
import ServerboundPingRequestPacket from './packets/status/ServerboundPingRequestPacket';
import ServerboundStatusRequestPacket from './packets/status/ServerboundStatusRequestPacket';

export default class Protocol {
    private protocolHandshakeHandlers: Handler<ServerboundPacket>[] = [new ClientIntentionHandler()];
    private protocolHandshakePackets: ServerboundPacket[] = [new ServerboundClientIntentionPacket()];
    private protocolStatusPackets: ServerboundPacket[] = [
        new ServerboundStatusRequestPacket(),
        new ServerboundPingRequestPacket(),
    ];
    private protocolStatusHandlers: Handler<ServerboundPacket>[] = [
        new StatusRequestHandler(),
        new PingRequestHandler(),
    ];
    private protocolLoginPackets: ServerboundPacket[] = [
        new ServerboundHelloPacket(),
        new ServerboundKeyPacket(),
        new ServerboundCustomQueryPacket(),
    ];
    private protocolLoginHandlers: Handler<ServerboundPacket>[] = [
        new HelloHandler(),
        new KeyHandler(),
        new CustomQueryHandler(),
    ];

    public getPacket(state: ProtocolState, id: number): ServerboundPacket | null {
        switch (state) {
            case ProtocolState.HANDSHAKING: {
                return this.protocolHandshakePackets[id] ?? null;
            }

            case ProtocolState.PLAY: {
                return null;
            }

            case ProtocolState.STATUS: {
                return this.protocolStatusPackets[id] ?? null;
            }

            case ProtocolState.LOGIN: {
                return this.protocolLoginPackets[id] ?? null;
            }

            default: {
                throw new TypeError(`${state} is an invalid protocol state!`);
            }
        }
    }

    public getHandler(state: ProtocolState, id: number): Handler<ServerboundPacket> | null {
        switch (state) {
            case ProtocolState.HANDSHAKING: {
                return this.protocolHandshakeHandlers[id] ?? null;
            }

            case ProtocolState.PLAY: {
                return null;
            }

            case ProtocolState.STATUS: {
                return this.protocolStatusHandlers[id] ?? null;
            }

            case ProtocolState.LOGIN: {
                return this.protocolLoginHandlers[id] ?? null;
            }

            default: {
                throw new TypeError(`${state} is an invalid protocol state!`);
            }
        }
    }
}

export enum ProtocolState {
    HANDSHAKING = -1,
    PLAY,
    STATUS,
    LOGIN,
}
