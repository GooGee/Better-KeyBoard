import Finger from "../Model/Finger"
import countStroke, { LeftRightHand } from "./countStroke"

export class OldNewResult {
    constructor(readonly result0: LeftRightHand, readonly result1: LeftRightHand) {}

    get all() {
        return getPercentage(this.result0.sum(), this.result1.sum())
    }

    get stroke() {
        return getPercentage(this.result0.sum(true), this.result1.sum(true))
    }

    get strokeLeft() {
        return getPercentage(this.result0.left.far, this.result1.left.far)
    }

    get strokeRight() {
        return getPercentage(this.result0.right.far, this.result1.right.far)
    }

    get little() {
        return getPercentage(
            this.result0.sum(false, Finger.little),
            this.result1.sum(false, Finger.little),
        )
    }

    get littleLeft() {
        return getPercentage(
            this.result0.left.little.amount,
            this.result1.left.little.amount,
        )
    }

    get littleRight() {
        return getPercentage(
            this.result0.right.little.amount,
            this.result1.right.little.amount,
        )
    }
}

export default function compare(text: string) {
    const [result0, result1] = countStroke(text)
    // console.log(result0.left)
    // console.log(result0.right)
    // console.log(result1.left)
    // console.log(result1.right)

    const result = new OldNewResult(result0, result1)

    return result
}

function getPercentage(value0: number, value1: number) {
    let percentage = 0
    if (value0 === 0) {
        if (value1 === 0) {
            // skip
        } else {
            percentage = 1000
        }
    } else {
        percentage = ((value1 - value0) / value0) * 100
    }
    let sign = ""
    if (percentage > 0) {
        sign = "+"
    }
    return sign + percentage.toFixed(1) + " %"
}
