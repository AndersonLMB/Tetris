
export namespace MathUtils {


    export function getRandomIntBetween(min: number, max: number): number {
        return Math.floor(Math.random() * Math.floor(max - min)) + Math.floor(min);
    }

    export function getRandomInt(max: number): number {
        return MathUtils.getRandomIntBetween(0, max);
    }

}
