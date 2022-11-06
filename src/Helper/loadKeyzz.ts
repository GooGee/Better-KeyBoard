import Finger from "../Model/Finger"
import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"
import grid from "../keyzz.json"

const topKeyzz = [
    KeyEnum.BS,
    KeyEnum.Ctrl,
    KeyEnum.Delete,
    KeyEnum.Enter,
    KeyEnum.Esc,
    KeyEnum.RCtrl,
]

export function prepareKey(map: Map<string, Key>) {
    topKeyzz.forEach((item) => (map.get(item)!.zIndex = 11))
}

export default function loadKeyzz() {
    const keyzz: Key[] = []
    grid.forEach(function (kdzz) {
        kdzz.forEach(function (kd) {
            keyzz.push(
                new Key(
                    kd.x,
                    kd.y,
                    kd.w,
                    kd.h,
                    kd.leftHand,
                    kd.finger as Finger,
                    kd.far,
                    kd.text,
                    kd.second,
                    1,
                ),
            )
        })
    })
    return keyzz
}
