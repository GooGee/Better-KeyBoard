import Finger from "../Model/Finger"
import Key from "../Model/Key"
import grid from "../keyzz.json"

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
                ),
            )
        })
    })
    return keyzz
}
