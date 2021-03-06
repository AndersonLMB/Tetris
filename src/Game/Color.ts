export class Color {
    /**
     * R (0-255)
     */
    public red: number = 0;
    /**
     * G (0-255)
     */
    public green: number = 0;
    /**
     * B (0-255)
     */
    public blue: number = 200;
    /**
     * Alpha (0-1)
     */
    public alpha_float: number = 1;

    public SetRGBA(red: number, green: number, blue: number, alpha: number): void {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha_float = alpha;
    }

    public toString(): string {
        let rgbaString: string = `rgba(${this.red},${this.green},${this.blue},${this.alpha_float})`;
        return rgbaString;
    }



}
