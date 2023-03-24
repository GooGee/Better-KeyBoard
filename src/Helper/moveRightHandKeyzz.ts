import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveRightHandKeyzz(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.y === 0 || item.y > 5) {
            return item
        }
        if (item.text === KeyEnum.Delete) {
            return item
        }
        if (item.leftHand === false) {
            const key = item.clone()
            key.x += 3
            return key
        }
        return item
    })
}
