import { Color } from "./Color";
import { PositionInt } from "./PositionInt";
export class Tetromino {

    size: number = 4;
    /**
     * 颜色
     */
    private color: Color = new Color();
    public GetColor(): Color {
        return this.color;
    }
    public SetColor(color: Color): void {
        this.color = color;
    }

    /**
     * 方格
     */
    private grids: Array<boolean>;
    public GetGrid(x: number, y: number): boolean {
        let indexOfGrid = x + y * this.size;
        let resultBool = this.grids[indexOfGrid];
        return resultBool;
    }
    public GetPositionOfByIndex(index: number): PositionInt {
        let y: number = Math.floor(index / this.size);
        let x: number = index % (this.size);
        return { x: x, y: y };
    }
    /**
     * 根据偏移量移动俄罗斯方块
     * @param x x偏移量,正向右
     * @param y y偏移量,正向上
     */
    public MoveByXY(x: number, y: number): void {
        let position = this.GetLeftBottomPosition();


        // this.SetLeftBottomPosition( { x:    position.x+x   })
    }

    public SetGrid(x: number, y: number, bool: boolean): Tetromino {
        let indexOfGrid = x + y * this.size;
        this.grids[indexOfGrid] = bool;
        return this;
    }
    public FillGrid(x: number, y: number): Tetromino {
        return this.SetGrid(x, y, true);
    }
    public EmptyGrids(): void {
        let countOfGrids = (this.size) * (this.size);
        this.grids = new Array(countOfGrids);
        for (let index = 0; index < countOfGrids; index++) {
            this.grids[index] = false;
        }
    }
    public GetGrids(): Array<boolean> {
        return this.grids;
    }

    /**
     * 左下位置
     */
    private leftBottomPosition: PositionInt = { x: 0, y: 0 };
    public GetLeftBottomPosition(): PositionInt {
        return this.leftBottomPosition;
    }
    public SetLeftBottomPosition(positionInt: PositionInt): void {
        this.leftBottomPosition.x = positionInt.x;
        this.leftBottomPosition.y = positionInt.y;
    }

    constructor(shape: TetrominoShapes) {
        this.EmptyGrids();
        switch (shape) {
            case TetrominoShapes.I: {
                this.FillGrid(0, 0).FillGrid(1, 0).FillGrid(2, 0).FillGrid(3, 0);
            } break;
            case TetrominoShapes.J: {
                this.FillGrid(0, 0).FillGrid(1, 0).FillGrid(2, 0).FillGrid(0, 1);
            } break;
            case TetrominoShapes.L: {
                this.FillGrid(0, 0).FillGrid(1, 0).FillGrid(2, 0).FillGrid(2, 1);
            } break;
            case TetrominoShapes.O: {
                this.FillGrid(0, 0).FillGrid(1, 0).FillGrid(0, 1).FillGrid(1, 1);
            } break;
            case TetrominoShapes.S: {
                this.FillGrid(0, 0).FillGrid(1, 0).FillGrid(1, 1).FillGrid(1, 2);
            } break;
            case TetrominoShapes.T: {
                this.FillGrid(0, 0).FillGrid(1, 0).FillGrid(2, 0).FillGrid(1, 1);
            } break;
            case TetrominoShapes.Z: {
                this.FillGrid(0, 1).FillGrid(1, 0).FillGrid(2, 0).FillGrid(3, 0);
            } break;
            default: { } break;
        }
    }
}

class TetrominoGrid {

}

export enum TetrominoShapes {
    I, J, L, O, S, T, Z
}
