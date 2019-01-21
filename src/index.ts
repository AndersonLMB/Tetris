

import { Game } from "./Game/Game";
import { GameGrid } from "./Game/GameGrid";

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

game.Render()


window["game"] = game;