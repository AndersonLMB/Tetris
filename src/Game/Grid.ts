
import { Color_RGBA_255 } from "./Color";

export class Grid {
    public GridStatus: GridStatus;
    public FillColor: Color_RGBA_255 = new Color_RGBA_255(0, 0, 255, 1);
    public StrokeColor: Color_RGBA_255 = new Color_RGBA_255(0, 255, 0, 1);

    constructor(status: GridStatus) {
        this.GridStatus = status;
    }


}

export enum GridStatus {
    Empty, Blocked
}