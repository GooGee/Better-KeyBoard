import Finger from "./Finger"

const BoxWidth = 64

export default class Key {
    constructor(
        public x: number,
        public y: number,
        public w: number,
        public h: number,
        public leftHand: boolean,
        public finger: Finger,
        public text: string,
    ) {}

    get left() {
        return this.x * BoxWidth
    }

    get top() {
        return this.y * BoxWidth
    }

    get width() {
        return this.w * BoxWidth
    }

    get height() {
        return this.h * BoxWidth
    }

    clone() {
        return new Key(
            this.x,
            this.y,
            this.w,
            this.h,
            this.leftHand,
            this.finger,
            this.text,
        )
    }
}
