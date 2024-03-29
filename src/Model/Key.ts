import Finger from "./Finger"

export const BoxWidth = 64
const BoxPadding = 4
const BoxMargin = 4

export default class Key {
    gray = false

    constructor(
        public x: number,
        public y: number,
        public w: number,
        public h: number,
        public leftHand: boolean,
        public finger: Finger,
        public far: boolean,
        public text: string,
        public second: string,
    ) {}

    get left() {
        return this.x * BoxWidth + BoxMargin
    }

    get top() {
        return this.y * BoxWidth + BoxMargin
    }

    get width() {
        return this.w * BoxWidth - BoxMargin * 2
    }

    get height() {
        return this.h * BoxWidth - BoxMargin * 2
    }

    clone() {
        return new Key(
            this.x,
            this.y,
            this.w,
            this.h,
            this.leftHand,
            this.finger,
            this.far,
            this.text,
            this.second,
        )
    }
}
