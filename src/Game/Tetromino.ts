import { Color } from "./Color";
import { PositionInt } from "./PositionInt";
import { Game } from "./Game";
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
    /**
     * 给出整数获取该整数在该Tetromino的位置
     * @param index 
     */
    public GetPositionOfByIndex(index: number): PositionInt {
        let y: number = Math.floor(index / this.size);
        let x: number = index % (this.size);
        return { x: x, y: y };
    }

    /**
     * 获取该Tetromino的所有Block的位置(相对于Tetromino的左下方)
     */
    public GetPositionsOfGridsOfTetromino(): Array<PositionInt> {
        let positions: Array<PositionInt> = new Array<PositionInt>();
        let grids = this.GetGrids();
        grids.forEach((gridOfTetromino, indexOfGrid) => {
            if (gridOfTetromino) {
                let position: PositionInt = this.GetPositionOfByIndex(indexOfGrid);
                positions.push(position);
            }
        });
        return positions;
    }

    /**
     * 获取该Tetromino的所有Block的位置(相对于Tetromino的左下方)
     */
    public GetPositionsOfGridsOfTetrominoInGame(): Array<PositionInt> {
        let positionsOfGridsInTetromino = this.GetPositionsOfGridsOfTetromino()
        let positionsBasedOnGame = positionsOfGridsInTetromino.map((positionBasedOnTetromino) => {
            let positionBasedOnGame: PositionInt = {
                x: positionBasedOnTetromino.x + this.GetLeftBottomPosition().x,
                y: positionBasedOnTetromino.y + this.GetLeftBottomPosition().y
            };
            return positionBasedOnGame;
        });
        return positionsBasedOnGame;
    }

    /**
     * 获取尝试移动后新的位置
     * @param x 
     * @param y 
     */
    public GetPositionsOfGridsOfTetrominoInGameIfMoveByXY(x: number, y: number): Array<PositionInt> {
        let originalPositions = this.GetPositionsOfGridsOfTetrominoInGame();
        let newPositions: Array<PositionInt> = originalPositions.map((originalPosition) => {
            let newPosition: PositionInt = { x: originalPosition.x + x, y: originalPosition.y + y };
            return newPosition;
        });
        return newPositions;
    }

    /**
     * 根据偏移量移动俄罗斯方块
     * @param x x偏移量,正向右
     * @param y y偏移量,正向上
     */
    public MoveByXY(x: number, y: number): Tetromino {
        let leftBottomPositionOfTetromino = this.GetLeftBottomPosition();
        let xAfterMove = leftBottomPositionOfTetromino.x + x;
        let yAfterMove = leftBottomPositionOfTetromino.y + y;
        let blocksOfTetrominoInGame: boolean = false;
        this.SetLeftBottomPosition({ x: xAfterMove, y: yAfterMove });
        return this;
        // this.SetLeftBottomPosition( { x:    position.x+x   })
    }
    /**
     * 向下移动
     */
    public MoveDownByOne(): Tetromino {
        return this.MoveByXY(0, -1);
    }
    /**
     * 向左移动
     */
    public MoveLeftByOne(): Tetromino {
        return this.MoveByXY(-1, 0);
    }
    /**
     * 向右移动
     */
    public MoveRightByOne(): Tetromino {
        return this.MoveByXY(1, 0);
    }
    /**
     * 向上移动
     */
    public MoveUpByOne(): Tetromino {
        return this.MoveByXY(0, 1);
    }

    /**
     * 是否允许移动x,y
     * @param x 
     * @param y 
     */
    public CanMoveByXY(x: number, y: number): boolean {
        let canMovedByXY: boolean = false;
        let movedPositions = this.GetPositionsOfGridsOfTetrominoInGameIfMoveByXY(x, y);
        let game = this.GetGame();
        let results = movedPositions.map((position) => {
            return (game.IfPositionInGame(position) && !(game.IfPositionBlocked(position)));
        });
        canMovedByXY = !(results.includes(false));
        return canMovedByXY;
    }

    public TryMoveByXY(x: number, y: number): boolean {
        if (this.CanMoveByXY(x, y)) {
            this.MoveByXY(x, y);
            return true;
        }
        else {
            return false;
        }
    }

    public TryMoveByXYAndExecutor(x: number, y: number, executor: MoveActionExecutor): void {
        switch (executor) {
            case MoveActionExecutor.Gravity:
                {
                    let moveResult = this.TryMoveByXY(x, y);
                    if (!moveResult) {
                        this.GetGame().TurnGameGridToBlockedByTetrominoAndRemoveTetrominoFromGame(this);
                    }
                }
                break;
            case MoveActionExecutor.Player:
                {
                    let moveResult = this.TryMoveByXY(x, y);
                } break;

            default:
                break;
        }
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
                this.FillGrid(0, 1).FillGrid(1, 0).FillGrid(2, 0).FillGrid(1, 1);
            } break;
            default: { } break;
        }
    }
    /**
     * 绑定的Game
     */
    private game: Game;
    public GetGame(): Game {
        return this.game;
    }
    public SetGame(game: Game): void {
        this.game = game;
    }
}

export enum MoveActionExecutor {
    Player, Gravity
}

export class TetrominoFactory {

}
class TetrominoGrid {

}

export enum TetrominoShapes {
    I, J, L, O, S, T, Z
}
