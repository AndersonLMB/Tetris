import { Game } from "../Game/Game";
import { Tetromino, MoveActionExecutor } from "../Game/Tetromino";
import * as KeyCode from "keycode-js";


export class GameRun {


    public static RunNormally(game: Game): void {


        let tetromino = game.GenerateTetrominoRandomly();

        tetromino.SetLeftBottomPosition({ x: 4, y: 20 });
        game.Render();




        let listener: EventListener = (ev) => {
            let evh = <KeyboardEvent>ev;
            switch (evh.keyCode) {
                case KeyCode.KEY_LEFT:
                    {
                        tetromino.TryMoveByXYAndExecutor(-1, 0, MoveActionExecutor.Player);
                        game.Render()
                    }
                    break;

                case KeyCode.KEY_RIGHT: {
                    tetromino.TryMoveByXYAndExecutor(1, 0, MoveActionExecutor.Player);
                    game.Render();
                } break;
                case KeyCode.KEY_DOWN: {
                    tetromino.TryMoveByXYAndExecutor(0, -1, MoveActionExecutor.Player);
                    game.Render();
                } break;
                case KeyCode.KEY_UP: {

                    game.Render();
                }
                    break;
                default:
                    break;

            }
        }

        document.body.addEventListener("keydown", listener);
        setInterval(
            () => {
                tetromino.TryMoveByXYAndExecutor(0, -1, MoveActionExecutor.Gravity);
                game.Render();
            }
            , 1000)

        // document.body.addEventListener()=

        // document.body.onkeydown = (ev) => {
        //     console.log(ev);

        //     switch (ev.keyCode) {
        //         case KeyCode.KEY_LEFT:
        //             {
        //                 tetJ.MoveLeftByOne();
        //                 game.Render()
        //             }
        //             break;

        //         case KeyCode.KEY_RIGHT: {
        //             tetJ.MoveRightByOne();
        //             game.Render();
        //         } break;
        //         case KeyCode.KEY_DOWN: {
        //             tetJ.MoveDownByOne();
        //             game.Render();
        //         } break;
        //         case KeyCode.KEY_UP: {
        //             tetJ.MoveUpByOne();
        //             game.Render();
        //         }
        //             break;
        //         default:
        //             break;
        //     }
        // }

    }

}