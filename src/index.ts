

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

window["game"] = game;