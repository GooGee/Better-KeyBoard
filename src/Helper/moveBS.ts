import Finger from "../Model/Finger"
import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveBS(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === KeyEnum.BS) {
            const key = item.clone()
            key.x = 6
            key.h = 2
            key.finger = Finger.index
            key.leftHand = true
            return key
        }
        return item
    })
}
