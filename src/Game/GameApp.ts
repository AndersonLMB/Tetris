
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

    private grids: Array<Grid>;

    private targeContext: CanvasRenderingContext2D = null;


    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
        let countOfGrids = x * y;
        this.grids = new Array<Grid>(countOfGrids);

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

    public GetContext(): CanvasRenderingContext2D {
        return this.targeContext;
    }

    public SetContext(context: CanvasRenderingContext2D) {
        this.targeContext = context;
    }

    public Render(): void {
        let context = this.GetContext();
        if (context != null) {

            let canvasX = context.canvas.width;
            let canvasY = context.canvas.height;

            let xRatio = canvasX / this.X;
            let yRatio = canvasY / this.Y;
            let minRatio = Math.min(xRatio, yRatio);
            let ratio = minRatio;
            let gameWidth = ratio * this.X;
            let gameHeight = ratio * this.Y;
            for (let y = 0; y < this.Y; y++) {
                for (let x = 0; x < this.X; x++) {
                    let grid: Grid = this.GetGrid(x, y);

                }

            }
        }
    }

    public RenderGrid(): void {

    }
}
