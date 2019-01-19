
import { Color_RGBA_255 } from "./Color";

export class Grid {
    public GridStatus: GridStatus;
    public FillColor: Color_RGBA_255;
    public StrokeColor: Color_RGBA_255;

    constructor(status: GridStatus) {
        this.GridStatus = status;
    }

}

export enum GridStatus {
    Empty, Blocked
}