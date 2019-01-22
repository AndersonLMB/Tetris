import { GameGrid } from "./GameGrid";
import { Tetromino } from "./Tetromino";
import { CoordinateFloat } from "./CoordinateFloat";
import { PositionInt } from "./PositionInt";
import { Color } from "./Color";
// import { ILiteEvent, LiteEvent } from "./Event"

export class Game {

    public static offsetOfLeftOfNewTetromino: number = 3;
    public static offsetOfBottomOfNewTetromino: number = 19;


    public onNewTetrominoAddedListeners: Array<NewTetrominoAddedDelegate> = new Array<NewTetrominoAddedDelegate>();



    /**
     * 游戏宽度
     */
    public X: number = 10;
    /**
     * 游戏高度
     */
    public Y: number = 20;
    /**
     * canvas目标
     */
    private canvasTarget: HTMLCanvasElement;
    public GetTarget(): HTMLCanvasElement {
        return this.canvasTarget;
    }
    public SetTarget(target: HTMLCanvasElement): void {
        let self = this;
        this.canvasTarget = target;
        this.canvasTarget.getContext("2d");
        this.ResetCanvasSize();
        this.ResetRatio();
        document.body.onresize = (ev) => {
            self.ResetCanvasSize();
            self.ResetRatio();
            self.Render();
        };
    }
    public GetContext(): CanvasRenderingContext2D {
        return this.GetTarget().getContext("2d");
    }

    /**
     * 重新设置canvas尺寸
     */
    public ResetCanvasSize(): void {

        this.canvasTarget.width = this.canvasTarget.clientWidth;
        this.canvasTarget.height = this.canvasTarget.clientHeight;

        console.log(`Canvas size reset to width:${this.canvasTarget.width} height:${this.canvasTarget.height}`);
    }

    private ratio: number = 1;
    public ResetRatio(): void {
        let width: number = this.GetTarget().width;
        let height: number = this.GetTarget().height;
        let xRatio: number = width / this.X;
        let yRatio: number = height / this.Y;
        let minRatio: number = Math.min(xRatio, yRatio);
        // this.ratio = Math.floor(minRatio);
        this.ratio = minRatio;
    }

    /**
     * 游戏方格
     */
    private gameGrids: Array<GameGrid> = new Array<GameGrid>();
    /**
     * 获取所有方格
     */
    public GetGameGrids(): Array<GameGrid> {
        return this.gameGrids;
    }
    /**
     * 根据x,y值获取游戏方格
     * @param x 
     * @param y 
     */
    public GetGameGrid(x: number, y: number): GameGrid {
        let indexOfGameGrid = x + this.X * y;
        let resultGameGrid = this.GetGameGrids()[indexOfGameGrid];
        return resultGameGrid;
    }

    public GetPositionByIndex(index: number): PositionInt {
        let x = index % (this.X);
        let y = Math.floor(index / this.X);
        return { x: x, y: y };
    }

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
        let countOfGameGrids: number = this.X * this.Y;
        for (let i = 0; i < countOfGameGrids; i++) {
            let gameGrid = new GameGrid();
            this.gameGrids.push(gameGrid);
        }
    }

    /**
     * 俄罗斯方块
     */
    private tetrominos: Array<Tetromino> = new Array<Tetromino>();
    public GetTetrominos(): Array<Tetromino> {
        let tetrominos = this.tetrominos;
        return tetrominos;
    }

    public AddNewTetromino(tetromino: Tetromino): void {

    }

    public AddNewTetrominoAtXY(tetromino: Tetromino, x: number, y: number): void {
        this.tetrominos.push(tetromino);
        tetromino.SetLeftBottomPosition({ x: x, y: y });
        let game = this;
        this.RefreshGameGrids();
    }

    public RefreshGameGrids(): void {
        let game = this;

        game.GetGameGrids().forEach((grid, index) => {
            grid.color= new Color();
        });

        //遍历每个俄罗斯方块
        this.GetTetrominos().forEach((tetromino, indexOfTetrominos) => {
            console.log(tetromino);
            //遍历俄罗斯方块的每个格子
            let leftBottomPosition = tetromino.GetLeftBottomPosition();
            tetromino.GetGrids().forEach((blocked, indexOfGrids) => {
                if (blocked) {
                    let positionOfThisBlockInTetromino = tetromino.GetPositionOfByIndex(indexOfGrids);
                    let xOfThisBlockInGame = leftBottomPosition.x + positionOfThisBlockInTetromino.x;
                    let yOfThisBlockInGame = leftBottomPosition.y + positionOfThisBlockInTetromino.y;
                    console.log({ x: xOfThisBlockInGame, y: yOfThisBlockInGame });
                    let gridInGameOfThisBlock = game.GetGameGrid(xOfThisBlockInGame, yOfThisBlockInGame);
                    gridInGameOfThisBlock.color = tetromino.GetColor();
                }
            });
        });
    }

    /**
     * 渲染
     */
    public Render(): void {
        if (this.GetTarget() == null) {
            throw new Error("Target not set yet.");
        }

        this.RefreshGameGrids();
        for (let y = 0; y < this.Y; y++) {
            for (let x = 0; x < this.X; x++) {
                try {
                    // console.log(`x:${x} y:${y}`);
                    let gameGrid = this.GetGameGrid(x, y);
                    let colorString = gameGrid.color.toString();
                    let gridSize = this.GetRatio();
                    let coordinate = this.GetLeftTopCoordinateOfGrid(x, y);
                    let context = this.GetContext();
                    context.fillStyle = colorString;
                    context.strokeStyle = "rgba(200,200,200,1)";
                    context.fillRect(coordinate.x, coordinate.y, gridSize, gridSize);
                    context.strokeRect(coordinate.x, coordinate.y, gridSize, gridSize);
                } catch (error) {
                    throw error;
                }
            }
        }
    }

    public GetRatio(): number {
        return this.ratio;
    }

    /**
     * 目标宽度
     */
    public GetWidth(): number {
        return this.GetTarget().width;
    }

    /**
     * 目标高度
     */
    public GetHeight(): number {
        return this.GetTarget().height;
    }

    /**
     * 获取左上角坐标
     * @param x 
     * @param y 
     */
    public GetLeftTopCoordinateOfGrid(x: number, y: number): CoordinateFloat {
        let width = this.GetWidth();
        let height = this.GetHeight();
        let ratio = this.GetRatio();
        let xResult = x * ratio;
        let yResult = height - (y + 1) * ratio - (height - this.Y * ratio);
        return { x: xResult, y: yResult };
    }
}

export interface NewTetrominoAddedDelegate {
    (game: Game, tetromino: Tetromino): void;
}