
const C255Number: number = 255;
export class Color_RGBA_255 {


    public Red: number;
    public Green: number;
    public Blue: number;
    public Alpha: number;
    constructor(r: number, g: number, b: number, a: number) {
        this.Alpha = a;
        this.Blue = b;
        this.Green = g;
        this.Red = r;
    }
    public toString(): string {
        let red = Math.min(C255Number * this.Red, C255Number);
        let green = Math.min(C255Number * this.Green, C255Number);
        let blue = Math.min(C255Number * this.Blue, C255Number);
        return `rgba(${red},${green},${blue},${this.Alpha})`;
    }
}




