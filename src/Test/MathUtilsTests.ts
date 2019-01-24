import { MathUtils } from "../Game/Utils";
window["MathUtils"] = MathUtils;
let o = {};
for (let index = 0; index < 10000; index++) {
    let random = MathUtils.getRandomIntBetween(1, 7);
    if (o[random]) {
        o[random] += 1;
    } else {
        o[random] = 1;
    }
    // o[random];
}
console.log(o);
