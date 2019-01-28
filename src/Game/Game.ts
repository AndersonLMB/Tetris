import { GameGrid } from "./GameGrid";
import { Tetromino, TetrominoShapes } from "./Tetromino";
import { CoordinateFloat } from "./CoordinateFloat";
import { PositionInt } from "./PositionInt";
import { Color } from "./Color";
import { MathUtils } from "./Utils";

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
        if (!(this.IfPositionInGame({ x: x, y: y }))) {
            throw new Error("Position not in Game");
        }

        let indexOfGameGrid = x + this.X * y;
        let resultGameGrid = this.GetGameGrids()[indexOfGameGrid];
        return resultGameGrid;
    }

    public GetPositionByIndex(index: number): PositionInt {
        let x = index % (this.X);
        let y = Math.floor(index / this.X);
        return { x: x, y: y };
    }

    /**
     * position是否在game内
     * @param position 
     */
    public IfPositionInGame(position: PositionInt): boolean {
        let positionInGame: boolean = false;
        if ((0 <= position.x && position.x < this.X) && (0 <= position.y && position.y < this.Y)) {
            positionInGame = true;
        }
        return positionInGame;
    }

    /**
     * position的格子是否已经固定
     * @param position 
     */
    public IfPositionBlocked(position: PositionInt): boolean {
        let ifGivenPositionInGameIsBlocked: boolean = true;
        let gameGrid = this.GetGameGrid(position.x, position.y);
        ifGivenPositionInGameIsBlocked = gameGrid.GetBlocked();
        return ifGivenPositionInGameIsBlocked;
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

    public Reset(): void {
        let tetrominos = this.GetTetrominos();
        tetrominos.forEach((tetromino) => {
        });
    }

    /**
     * 俄罗斯方块
     */
    private tetrominos: Array<Tetromino> = new Array<Tetromino>();
    public GetTetrominos(): Array<Tetromino> {
        let tetrominos = this.tetrominos;
        return tetrominos;
    }

    public ClearTetrominos(): void {
        this.tetrominos = new Array<Tetromino>();

    }

    /**
     * 随机生成Tetromino,形状随机,位置随机(在game范围内)
     */
    public GenerateTetrominoRandomly(): Tetromino {
        const enumValues = Object.keys(TetrominoShapes).map(n => Number.parseInt(n)).filter(n => !Number.isNaN(n));
        const randomIndex = MathUtils.getRandomInt(enumValues.length);
        const randomEnumValue = <TetrominoShapes>(enumValues[randomIndex]);
        const randomPosition: PositionInt = {
            x: MathUtils.getRandomIntBetween(0, this.X - 4),
            y: MathUtils.getRandomIntBetween(0, this.Y - 4)
        };
        const randomColor: Color = new Color();
        randomColor.SetRGBA(MathUtils.getRandomInt(256), MathUtils.getRandomInt(256), MathUtils.getRandomInt(256), Math.random());
        let newTetromino = this.GenerateTetromino(randomEnumValue, randomPosition);
        newTetromino.SetColor(randomColor);
        return newTetromino;
        // throw new Error("Not Implemented");
    }

    /**
     * 在指定position生成指定shape的Tetromino
     * @param shape  形状类型
     * @param positionInt 位置
     */
    public GenerateTetromino(shape: TetrominoShapes, positionInt: PositionInt): Tetromino {
        let tetromino: Tetromino = new Tetromino(shape);
        this.AddNewTetromino(tetromino);
        tetromino.SetLeftBottomPosition(positionInt);
        this.Render();
        return tetromino;
    }

    /**
     * 添加Tetromino到Game里
     * @param tetromino 
     */
    public AddNewTetromino(tetromino: Tetromino): void {
        this.AddNewTetrominoAtXY(tetromino, tetromino.GetLeftBottomPosition().x, tetromino.GetLeftBottomPosition().y);
    }

    /**
     * 添加Tetromino到Game里，指定位置
     * @param tetromino 
     * @param x 
     * @param y 
     */
    public AddNewTetrominoAtXY(tetromino: Tetromino, x: number, y: number): void {
        this.tetrominos.push(tetromino);
        tetromino.SetGame(this);
        tetromino.SetLeftBottomPosition({ x: x, y: y });
        let game = this;
        this.RefreshGameGrids();
    }

    /**
     * 将某个tetromino移出game
     * @param tetromino 
     */
    public RemoveTetrominoFromGame(tetromino: Tetromino): void {
        let indexOfTetromino = this.tetrominos.indexOf(tetromino);
        if (indexOfTetromino < 0) {
            throw new Error("Tetromino not belong to the game");
        }
        this.RemoveTetrominoFromGameByIndexOfTetrominoInGame(indexOfTetromino);
    }
    /**
     * 根据索引号将tetromino移出game
     * @param index 
     */
    public RemoveTetrominoFromGameByIndexOfTetrominoInGame(index: number): void {
        this.tetrominos.splice(index, 1);
    }

    public RefreshGameGrids(): void {
        let game = this;

        game.GetGameGrids().forEach((grid, index) => {
            grid.color = new Color();
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

    /**
     * 检查位置是否在game范围内
     * @param position 
     */
    public IsPositionInGame(position: PositionInt): boolean {
        let x = position.x;
        let y = position.y;
        let inGame: boolean = false;
        if ((0 <= x && x < this.X) && (0 <= y && y < this.Y)) {
            inGame = true;
        }
        return inGame;
    }

    public TurnGameGridToBlocked(position: PositionInt): void {
        let x = position.x;
        let y = position.y;
        if (this.IsPositionInGame(position) == false) {
            throw new Error("Position not in game, unable to turn grid to block!");
        }
        let gameGridToTurnBlocked = this.GetGameGrid(x, y);
        gameGridToTurnBlocked.SetBlocked(true);
        this.Render();
    }

    /**
     * 根据Tetromino占用的格子的位置在game中生成固定方块
     * @param tetromino 
     */
    public TurnGameGridToBlockedByTetromino(tetromino: Tetromino): void {
        let gridsOfTetromino = tetromino.GetGrids();
        let positionOfTetrominoInGame = tetromino.GetLeftBottomPosition();
        gridsOfTetromino.forEach((gridOfTetromino, indexOfTetromino) => {
            console.log(gridOfTetromino);
            if (gridOfTetromino) {
                let positionOfGridInTetromino = tetromino.GetPositionOfByIndex(indexOfTetromino);
                let positionOfGridInGame: PositionInt = {
                    x: positionOfGridInTetromino.x + positionOfTetrominoInGame.x,
                    y: positionOfGridInTetromino.y + positionOfTetrominoInGame.y
                }
                this.TurnGameGridToBlocked(positionOfGridInGame);
                let color = tetromino.GetColor();
                this.TurnGameGridToColor(positionOfGridInGame, color);
            }
        });
    }
    /**
     * 根据Tetromino占用的格子的位置在game中生成固定方块并在game移除该tetromino
     * @param tetromino 
     */
    public TurnGameGridToBlockedByTetrominoAndRemoveTetrominoFromGame(tetromino: Tetromino): void {
        this.TurnGameGridToBlockedByTetromino(tetromino);
        this.RemoveTetrominoFromGame(tetromino);
    }





    public TurnGameGridToColor(position: PositionInt, color: Color): void {
        let gridOfGame = this.GetGameGrid(position.x, position.y);
        gridOfGame.color.SetRGBA(color.red, color.green, color.blue, color.alpha_float);
    }
}

export interface NewTetrominoAddedDelegate {
    (game: Game, tetromino: Tetromino): void;
}