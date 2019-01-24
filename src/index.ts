import { Game } from "./Game/Game";
import { GameGrid } from "./Game/GameGrid";
import { Tetromino, TetrominoShapes } from "./Game/Tetromino";
import { MathUtils } from "./Game/Utils";


import * as KeyCode from "keycode-js";


let element: HTMLElement;
try {
    element = document.getElementById("tetris-canvas1");
} catch (error) {
    throw error;
}
let canvas: HTMLCanvasElement;
try {
    canvas = <HTMLCanvasElement>element;
} catch (error) {
    throw error;
}


let game: Game = new Game(10, 23);
game.SetTarget(canvas);

var grid = game.GetGameGrid(3, 4);
grid.color.red = 250;
grid.color.blue = 0;

let tetJ = new Tetromino(TetrominoShapes.J);
tetJ.GetColor().SetRGBA(255, 0, 0, 1);
let tetO = new Tetromino(TetrominoShapes.O);
tetO.GetColor().SetRGBA(0, 200, 0, 1);
game.AddNewTetrominoAtXY(tetO, 2, 3);
game.AddNewTetrominoAtXY(tetJ, 1, 6);

tetJ.MoveRightByOne()
    .MoveRightByOne()
    .MoveRightByOne()
    .MoveDownByOne()
    .MoveByXY(0, 3);
game.Render();

document.body.onkeydown = (ev) => {
    console.log(ev);

    switch (ev.keyCode) {
        case KeyCode.KEY_LEFT:
            {
                tetJ.MoveLeftByOne();
                game.Render()
            }
            break;

        case KeyCode.KEY_RIGHT: {
            tetJ.MoveRightByOne();
            game.Render();
        } break;
        case KeyCode.KEY_DOWN: {
            tetJ.MoveDownByOne();
            game.Render();
        } break;
        case KeyCode.KEY_UP: {
            tetJ.MoveUpByOne();
            game.Render();
        }
            break;
        default:
            break;
    }
}

window["game"] = game;
window["Tetromino"] = Tetromino;
window["TetrominoShapes"] = TetrominoShapes;
