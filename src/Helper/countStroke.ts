import Finger from "../Model/Finger"
import KeyEnum from "../Model/KeyEnum"
import loadKeyzz from "./loadKeyzz"
import { runAll } from "./makeActionzz"
import { makeStrokeStateNew, makeStrokeStateOld, StrokeState } from "./makeStrokeState"

const WordLength = 5 // iff word length great than this, use Tab
// add an Ctrl for every 33 characters
const AddCtrlAfter = 33 // Esc Ctrl
const AddDeleteAfter = 88 // Esc Backspace
const AddArrowAfter = 33 // Backspace Delete ↑ ↓ ← →

const ignore = new Set([" ", "\r", "]", "}", ")"])
const az = "abcdefghijklmnopqrstuvwxyz"
const letterzz = az.concat(az.toUpperCase()).split("")
const abc = new Set([...letterzz, "_"])
const a0 = new Set([...letterzz, "_", ..."0123456789".split("")])

const keyzz = loadKeyzz()
const map0 = makeStrokeStateOld(keyzz)
const map1 = makeStrokeStateNew(runAll(keyzz))

export default function countStroke(text: string) {
    let aaSpace = 0
    let aaWord = 0
    let start = 0
    let isWord = false
    let char = ""
    const missing0 = new Set([""])
    const missing1 = new Set([""])
    const result0 = new LeftRightHand()
    const result1 = new LeftRightHand()
    for (let index = 0; index < text.length; index++) {
        const letter = text[index]
        if (a0.has(letter)) {
            if (isWord) {
                // ok
            } else {
                if (abc.has(letter)) {
                    isWord = true
                    aaWord += 1
                } else {
                    start = index + 1
                    addAll(letter, map0, result0, missing0)
                    addAll(letter, map1, result1, missing1)
                }
            }
        } else {
            if (isWord) {
                addWord(text, start, index, missing0, missing1, result0, result1)
            } else {
                if (ignore.has(letter)) {
                    if (letter === " " && char === letter) {
                        aaSpace += 1
                    }
                } else {
                    addAll(letter, map0, result0, missing0)
                    addAll(letter, map1, result1, missing1)
                }
            }
            start = index + 1
            isWord = false
        }
        char = letter
    }
    if (isWord) {
        addWord(text, start, text.length, missing0, missing1, result0, result1)
    }
    appendAll(result0, result1, text.length - aaSpace)

    console.log("length: " + text.length)
    console.log("word: " + aaWord)
    console.log("space: " + aaSpace)
    console.log("old missing " + Array.from(missing0.keys()).join(" "))
    console.log("new missing " + Array.from(missing1.keys()).join(" "))
    return [result0, result1]
}

function addWord(
    text: string,
    start: number,
    ende: number,
    missing0: Set<string>,
    missing1: Set<string>,
    result0: LeftRightHand,
    result1: LeftRightHand,
) {
    let length = ende - start
    if (length === 0) {
        return
    }
    if (length > WordLength) {
        length = WordLength
        addAll("Tab", map0, result0, missing0)
        addAll("Tab", map0, result1, missing1)
    }
    for (let index = start; index < start + length; index++) {
        addAll(text[index], map0, result0, missing0)
        addAll(text[index], map1, result1, missing1)
    }
}

function appendAll(result0: LeftRightHand, result1: LeftRightHand, length: number) {
    const amountCtrl = Math.floor(length / AddCtrlAfter)
    const amountArrow = Math.floor(length / AddArrowAfter)
    const amountDelete = Math.floor(length / AddDeleteAfter)

    appendLeft(result0, amountCtrl)
    appendRight(result0, amountArrow, amountDelete)

    result1.left.amount += amountCtrl
    // Ctrl is no longer far for thumb
    // Backspace is still far for index finger
    result1.left.far += amountDelete

    result1.right.amount += amountArrow
    // Delete is still far for index finger
    result1.right.far += amountDelete
}

function appendLeft(result: LeftRightHand, amount: number) {
    result.left.little.amount += amount
    result.left.little.far += amount
    result.left.amount += amount
    result.left.far += amount
}

function appendRight(result: LeftRightHand, amount: number, amountDelete: number) {
    // arrow keys are not for little finger
    result.right.little.amount += amountDelete
    result.right.little.far += amountDelete
    result.right.amount += amount
    result.right.far += amount
}

function addAll(
    letter: string,
    map: Map<string, StrokeState[]>,
    result: LeftRightHand,
    missing: Set<string>,
) {
    if (letter === "\n") {
        letter = KeyEnum.Enter
    }

    const found = map.get(letter)
    if (found === undefined) {
        missing.add(letter)
        return
    }

    found.forEach(function (item) {
        if (item.leftHand) {
            countHand(item, result.left)
            return
        }
        countHand(item, result.right)
    })
}

function countHand(item: StrokeState, hand: Hand) {
    hand.amount += 1
    hand.far += item.far
    if (item.finger === Finger.unknown) {
        return
    }
    add(item, hand[item.finger])
}

function add(item: StrokeState, finger: StrokeState) {
    finger.amount += item.amount
    finger.far += item.far
}

export class LeftRightHand {
    readonly left = new Hand(true)
    readonly right = new Hand(false)

    sum(far = false, finger: null | "little" = null) {
        if (finger === null) {
            if (far) {
                return this.left.far + this.right.far
            }
            return this.left.amount + this.right.amount
        }

        if (far) {
            return this.left[finger].far + this.right[finger].far
        }
        return this.left[finger].amount + this.right[finger].amount
    }
}

export class Hand {
    amount = 0
    far = 0

    constructor(
        readonly leftHand: boolean,
        readonly thumb = new StrokeState(Finger.thumb, leftHand, 0),
        readonly index = new StrokeState(Finger.index, leftHand, 0),
        readonly middle = new StrokeState(Finger.middle, leftHand, 0),
        readonly ring = new StrokeState(Finger.ring, leftHand, 0),
        readonly little = new StrokeState(Finger.little, leftHand, 0),
    ) {}
}
