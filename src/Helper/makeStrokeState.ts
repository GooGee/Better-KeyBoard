import Finger from "../Model/Finger"
import Key from "../Model/Key"

export function makeStrokeStateOld(keyzz: Key[]) {
    const map: Map<string, StrokeState[]> = new Map()
    keyzz.forEach(function (key) {
        add(key, map)
    })
    return map
}

export function makeStrokeStateNew(keyzz: Key[]) {
    const map: Map<string, StrokeState[]> = new Map()
    keyzz.forEach(function (key) {
        if (key.finger === Finger.little) {
            // skip
        } else {
            add(key, map)
        }
    })
    keyzz.forEach(function (key) {
        if (key.far && key.finger === Finger.little) {
            return
        }
        add(key, map, true)
        if (key.second) {
            if (map.has(key.second)) {
                return
            }
            map.set(key.second, [
                new StrokeState(Finger.thumb, !key.leftHand, 0),
                new StrokeState(key.finger, key.leftHand, key.far ? 1 : 0),
            ])
        }
    })
    return map
}

function add(key: Key, map: Map<string, StrokeState[]>, skipIfExists = false) {
    const far = key.far ? 1 : 0
    const ss = new StrokeState(key.finger, key.leftHand, far)
    if (key.text.includes("\n")) {
        // !\n1
        const letterzz = key.text.split("\n")
        // !
        map.set(letterzz[0], [ss, new StrokeState(Finger.little, !key.leftHand, 0)])
        // 1
        map.set(letterzz[1], [ss])
        return
    }

    if (map.has(key.text) && skipIfExists) {
        return
    }
    if (key.text.length === 1 && key.text.toLowerCase() !== key.text) {
        // A
        map.set(key.text, [ss, new StrokeState(Finger.little, !key.leftHand, 0)])
        // a
        map.set(key.text.toLowerCase(), [ss])
        return
    }

    // Ctrl
    map.set(key.text, [ss])
}

export class StrokeState {
    constructor(
        public finger: Finger,
        public leftHand: boolean,
        public far: number,
        public amount = 1,
    ) {}
}
