let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

try {
    let canvasHtml = document.getElementById("tetris-canvas1");
    canvas = <HTMLCanvasElement>canvasHtml;
    canvas.height = canvasHtml.clientHeight;
    canvas.width = canvasHtml.clientWidth;

    ctx = canvas.getContext("2d");

    canvas.onresize = (ev) => {
        console.log(ev);
    }
} catch (error) {

}






console.log(canvas.width);
console.log(canvas.height);

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);