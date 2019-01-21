import { Color } from "./Color"

export class GameGrid {
    public color: Color = new Color();

    /**
     * 是否存在方块
     */
    private blocked: boolean;
    public GetBlocked(): boolean {
        return this.blocked;
    }
    public SetBlocked(blocked: boolean): void {
        this.blocked = blocked;
    }

    

}





