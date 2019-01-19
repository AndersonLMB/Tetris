import { GameApp } from "./Game/GameApp";
import { Grid, GridStatus } from "./Game/Grid";


let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

try {
    let canvasHtml = document.getElementById("tetris-canvas1");
    canvas = <HTMLCanvasElement>canvasHtml;
    canvas.height = canvasHtml.clientHeight;
    canvas.width = canvasHtml.clientWidth;
    context = canvas.getContext("2d");
    canvas.onresize = (ev) => {
        console.log(ev);
    }
} catch (error) {

}

let game = GameApp.CreateGameAppByXY(10, 20);
game.SetContext(context);




game.Render();




console.log(canvas.width);
console.log(canvas.height);
context.fillStyle

context.fillStyle = "rgba(0,0,150,1)";

context.fillRect(10, 10, 100, 100);