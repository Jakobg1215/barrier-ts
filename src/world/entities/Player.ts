import type BarrierTs from '../../BarrierTs';
import ClientBoundMoveEntityPacketPos from '../../network/protocol/game/ClientBoundMoveEntityPosPacket';
import ClientBoundMoveEntityPacketPosRot from '../../network/protocol/game/ClientBoundMoveEntityPosRotPacket';
import ClientBoundMoveEntityPacketRot from '../../network/protocol/game/ClientBoundMoveEntityRotPacket';
import ClientBoundRotateHeadPacket from '../../network/protocol/game/ClientBoundRotateHeadPacket';
import ClientBoundSetEntityDatapacket, { FieldType } from '../../network/protocol/game/ClientBoundSetEntityDataPacket';
import ClientBoundSetEquipmentPacket from '../../network/protocol/game/ClientBoundSetEquipmentPacket';
import type ServerBoundClientInformationPacket from '../../network/protocol/game/ServerBoundClientInformationPacket';
import type GameProfile from '../../network/protocol/login/GameProfile';
import Item from '../../types/classes/Item';
import { ChatVisiblity } from '../../types/enums/ChatVisiblity';
import { HumanoidArm } from '../../types/enums/HumanoidArm';
import type SavedData from '../../types/SavedData';
import Vector2 from '../../utilitys/Vector2';
import Vector3 from '../../utilitys/Vector3';
import PlayerInventory from '../contaners/PlayerInventory';
import LivingEntity from './LivingEntity';

export default class Player extends LivingEntity {
    public isFlying = false;
    public chatVisibility = ChatVisiblity.FULL;
    public canChatColor = true; // TODO: Need to put getters and setters
    public textFilteringEnabled = false; // There are public for development.
    public allowsListing = false;
    public skinCustomisation = 0;
    public mainHand = HumanoidArm.RIGHT;
    public readonly inventory = new PlayerInventory();
    private previousPosition = Vector3.ZERO;
    private previousRotation = Vector2.ZERO;

    public constructor(private readonly server: BarrierTs, public readonly gameProfile: GameProfile) {
        super();
        this.synchedData.define(17, FieldType.BYTE, 0);
        this.synchedData.define(18, FieldType.BYTE, 1);
    }

    public override tick(): void {
        super.tick();

        if (this.synchedData.changed) {
            this.server.playerManager.sendAll(
                new ClientBoundSetEntityDatapacket(this.id, this.synchedData.getChangedData()),
            );
        }

        if (this.inventory.changed) {
            const changedItems: { pos: number; item: Item }[] = [];
            this.inventory.getChangedItems().forEach(slot => {
                switch (slot.index) {
                    case 5: {
                        changedItems.push({ pos: 5, item: slot.item });
                        break;
                    }
                    case 6: {
                        changedItems.push({ pos: 4, item: slot.item });
                        break;
                    }
                    case 7: {
                        changedItems.push({ pos: 3, item: slot.item });
                        break;
                    }
                    case 8: {
                        changedItems.push({ pos: 2, item: slot.item });
                        break;
                    }
                    case 45: {
                        changedItems.push({ pos: 1, item: slot.item });
                        break;
                    }
                    case this.inventory.selectedHand + 36: {
                        changedItems.push({ pos: 0, item: slot.item });
                        break;
                    }
                }
            });
            if (changedItems.length > 0)
                this.server.playerManager.sendAll(new ClientBoundSetEquipmentPacket(this.id, changedItems), this.id);
        }

        if (
            this.postion.x !== this.previousPosition.x ||
            this.postion.y !== this.previousPosition.y ||
            this.postion.z !== this.previousPosition.z
        ) {
            if (this.rotation.x !== this.previousRotation.x || this.rotation.y !== this.previousRotation.y) {
                this.server.playerManager.sendAll(
                    new ClientBoundMoveEntityPacketPosRot(
                        this.id,
                        (this.postion.x * 32 - this.previousPosition.x * 32) * 128,
                        (this.postion.y * 32 - this.previousPosition.y * 32) * 128,
                        (this.postion.z * 32 - this.previousPosition.z * 32) * 128,
                        Math.floor((this.rotation.y * 256) / 360),
                        Math.floor((this.rotation.x * 256) / 360),
                        this.onGround,
                    ),
                    this.id,
                );
                this.server.playerManager.sendAll(
                    new ClientBoundRotateHeadPacket(this.id, Math.floor((this.rotation.y * 256) / 360)),
                    this.id,
                );
                this.previousPosition = this.postion;
                this.previousRotation = this.rotation;
            } else {
                this.server.playerManager.sendAll(
                    new ClientBoundMoveEntityPacketPos(
                        this.id,
                        (this.postion.x * 32 - this.previousPosition.x * 32) * 128,
                        (this.postion.y * 32 - this.previousPosition.y * 32) * 128,
                        (this.postion.z * 32 - this.previousPosition.z * 32) * 128,
                        this.onGround,
                    ),
                    this.id,
                );
                this.previousPosition = this.postion;
            }
        } else if (this.rotation.x !== this.previousRotation.x || this.rotation.y !== this.previousRotation.y) {
            this.server.playerManager.sendAll(
                new ClientBoundMoveEntityPacketRot(
                    this.id,
                    Math.floor((this.rotation.y * 256) / 360),
                    Math.floor((this.rotation.x * 256) / 360),
                    this.onGround,
                ),
                this.id,
            );
            this.server.playerManager.sendAll(
                new ClientBoundRotateHeadPacket(this.id, Math.floor((this.rotation.y * 256) / 360)),
                this.id,
            );
            this.previousRotation = this.rotation;
        }
    }

    public updateOptions(clientInformation: ServerBoundClientInformationPacket): void {
        this.chatVisibility = clientInformation.chatVisibility;
        this.canChatColor = clientInformation.chatColors;
        this.textFilteringEnabled = clientInformation.textFilteringEnabled;
        this.allowsListing = clientInformation.allowsListing;
        this.synchedData.set(17, clientInformation.modelCustomisation);
        this.synchedData.set(18, clientInformation.mainHand); // TODO: Add a check if its being spammed
        this.skinCustomisation = clientInformation.modelCustomisation;
        this.mainHand = clientInformation.mainHand;
    }

    public updatePostion({
        x = this.postion.x,
        y = this.postion.y,
        z = this.postion.z,
        rotY = this.rotation.y,
        rotX = this.rotation.x,
        onGround,
    }: {
        x?: number;
        y?: number;
        z?: number;
        rotY?: number;
        rotX?: number;
        onGround: boolean;
    }): void {
        this.postion = new Vector3(x, y, z);
        this.rotation = new Vector2(rotX, rotY);
        this.onGround = onGround;
    }

    public updatePostionAbs({
        x = this.postion.x,
        y = this.postion.y,
        z = this.postion.z,
        rotY = this.rotation.y,
        rotX = this.rotation.x,
        onGround,
    }: {
        x?: number;
        y?: number;
        z?: number;
        rotY?: number;
        rotX?: number;
        onGround: boolean;
    }): void {
        this.postion = new Vector3(x, y, z);
        this.rotation = new Vector2(rotX, rotY);
        this.previousPosition = this.postion;
        this.previousRotation = this.rotation;
        this.onGround = onGround;
    }

    public setDataFromSave(data: SavedData): void {
        this.postion = new Vector3(data.position.x, data.position.y, data.position.z);
        this.rotation = new Vector2(data.rotation.x, data.rotation.y);
        this.previousPosition = new Vector3(data.position.x, data.position.y, data.position.z);
        this.previousRotation = new Vector2(data.rotation.x, data.rotation.y);
        this.isFlying = !!data.flying;
        data.inventory.forEach(slot => {
            this.inventory.setSlot(slot.slot, new Item(slot.present, slot.id, slot.count, Buffer.from(slot.nbt)));
        });
        this.inventory.selectedHand = data.selectedSlot;
    }
}
