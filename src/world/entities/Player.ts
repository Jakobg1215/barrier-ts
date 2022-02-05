import type BarrierTs from '../../BarrierTs';
import ClientBoundMoveEntityPosPacket from '../../network/protocol/game/ClientBoundMoveEntityPosPacket';
import ClientBoundMoveEntityPosRotPacket from '../../network/protocol/game/ClientBoundMoveEntityPosRotPacket';
import ClientBoundMoveEntityRotPacket from '../../network/protocol/game/ClientBoundMoveEntityRotPacket';
import ClientBoundRotateHeadPacket from '../../network/protocol/game/ClientBoundRotateHeadPacket';
import ClientBoundSetEntityDatapacket from '../../network/protocol/game/ClientBoundSetEntityDataPacket';
import type ServerBoundClientInformationPacket from '../../network/protocol/game/ServerBoundClientInformationPacket';
import type GameProfile from '../../network/protocol/login/GameProfile';
import { ChatVisiblity } from '../../types/enums/ChatVisiblity';
import { HumanoidArm } from '../../types/enums/HumanoidArm';
import Vector2 from '../../utilitys/Vector2';
import Vector3 from '../../utilitys/Vector3';
import LivingEntity from './LivingEntity';

export default class Player extends LivingEntity {
    public isFlying = false;
    public chatVisibility = ChatVisiblity.FULL;
    public canChatColor = true; // TODO: Need to put getters and setters
    public textFilteringEnabled = false; // There are public for development.
    public allowsListing = true;
    public skinCustomisation = 0;
    public mainHand = HumanoidArm.RIGHT;

    public constructor(private readonly server: BarrierTs, public readonly gameProfile: GameProfile) {
        super();
    }

    public override tick(): void {
        super.tick();
    }

    public updateOptions(clientInformation: ServerBoundClientInformationPacket): void {
        this.chatVisibility = clientInformation.chatVisibility;
        this.canChatColor = clientInformation.chatColors;
        this.textFilteringEnabled = clientInformation.textFilteringEnabled;
        this.allowsListing = clientInformation.allowsListing;
        const update = new ClientBoundSetEntityDatapacket(this.id, []);
        if (clientInformation.modelCustomisation !== this.skinCustomisation)
            update.packedItems.push({ index: 17, type: 0, value: clientInformation.modelCustomisation });
        if (clientInformation.mainHand !== this.mainHand)
            update.packedItems.push({ index: 18, type: 0, value: clientInformation.mainHand }); // TODO: Add a check if its being spammed
        if (update.packedItems.length > 0) this.server.playerManager.sendAll(update);
        this.skinCustomisation = clientInformation.modelCustomisation;
        this.mainHand = clientInformation.mainHand;
    }

    public moveRotate(x: number, y: number, z: number, yRot: number, xRot: number, onGround: boolean) {
        this.server.playerManager.sendAll(
            new ClientBoundMoveEntityPosRotPacket(
                this.id,
                (x * 32 - this.postion.x * 32) * 128,
                (y * 32 - this.postion.y * 32) * 128,
                (z * 32 - this.postion.z * 32) * 128,
                Math.floor((yRot * 256) / 360),
                Math.floor((xRot * 256) / 360),
                onGround,
            ),
            this.id,
        );
        this.server.playerManager.sendAll(
            new ClientBoundRotateHeadPacket(this.id, Math.floor((yRot * 256) / 360)),
            this.id,
        );
        this.postion = new Vector3(x, y, z);
        this.rotation = new Vector2(xRot, yRot);
    }

    public movePos(x: number, y: number, z: number, onGround: boolean) {
        this.server.playerManager.sendAll(
            new ClientBoundMoveEntityPosPacket(
                this.id,
                (x * 32 - this.postion.x * 32) * 128,
                (y * 32 - this.postion.y * 32) * 128,
                (z * 32 - this.postion.z * 32) * 128,
                onGround,
            ),
            this.id,
        );
        this.postion = new Vector3(x, y, z);
    }

    public rotateTo(yRot: number, xRot: number, onGround: boolean) {
        this.server.playerManager.sendAll(
            new ClientBoundMoveEntityRotPacket(
                this.id,
                Math.floor((yRot * 256) / 360),
                Math.floor((xRot * 256) / 360),
                onGround,
            ),
            this.id,
        );
        this.server.playerManager.sendAll(
            new ClientBoundRotateHeadPacket(this.id, Math.floor((yRot * 256) / 360)),
            this.id,
        );
        this.rotation = new Vector2(xRot, yRot);
    }

    public updatePos(x: number, y: number, z: number) {
        this.postion = new Vector3(x, y, z);
    }
}
