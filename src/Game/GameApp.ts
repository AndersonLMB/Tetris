
import { Grid as Grid, GridStatus } from "./Grid";
export class GameApp {
    /**
     * 列数（宽度）
     */
    private X: number;
    /**
     * 行数（高度）
     */
    private Y: number;

    private grids: Grid[];

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
        let countOfGrids = x * y;
        this.grids = new Grid(GridStatus.Empty)[countOfGrids];
    }

    /**
     * 根据x,y获取方格
     * 3 4 5
     * 0 1 2
     * @param x 
     * @param y 
     */
    public GetGrid(x: number, y: number): Grid {
        let indexOfGrid = x + y * this.X;

        return this.grids[indexOfGrid];
    }

    public static CreateGameApp(): GameApp {
        return this.CreateGameAppByXY(10, 20);
    }
    public static CreateGameAppByXY(x: number, y: number): GameApp {
        return new GameApp(x, y);
    }
}

