import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class SetDisplayedRecipePacket extends Packet {
    public static readonly id = PlayServerbound.SetDisplayedRecipe;

    public RecipeID!: string;

    public decrypt() {
        this.RecipeID = this.readIdentifier();
    }
}
