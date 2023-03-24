import Finger from "../Model/Finger"
import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveEnter(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === KeyEnum.Enter) {
            const key = item.clone()
            key.x = 8
            key.y += 1
            key.h = 2
            key.finger = Finger.index
            return key
        }
        return item
    })
}
