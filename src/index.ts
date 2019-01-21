

import { Game } from "./Game/Game";
import { GameGrid } from "./Game/GameGrid";
import { Tetromino, TetrominoShapes } from "./Game/Tetromino";

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


let game: Game = new Game(10, 20);
game.SetTarget(canvas);

var grid = game.GetGameGrid(3, 4);
grid.color.red = 250;
grid.color.blue = 0;

let tetJ = new Tetromino(TetrominoShapes.J);
tetJ.GetColor().SetRGBA(255, 0, 0, 1);
let tetO = new Tetromino(TetrominoShapes.O);
tetO.GetColor().SetRGBA(0, 200, 0, 1);
game.AddNewTetrominoAtXY(tetO, 2, 3);
game.AddNewTetrominoAtXY(tetJ, 4, 6);

game.Render()




window["game"] = game;
window["Tetromino"] = Tetromino;
window["TetrominoShapes"] = TetrominoShapes; 