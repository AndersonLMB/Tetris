

export class Grid {
    public GridStatus: GridStatus;
    constructor(status: GridStatus) {
        this.GridStatus = status;
    }

}


export enum GridStatus {
    Empty, Block
}