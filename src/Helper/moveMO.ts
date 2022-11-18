import Finger from "../Model/Finger"
import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveMO(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === KeyEnum.MO1) {
            const key = item.clone()
            key.y = 6.5
            key.far = false
            key.finger = Finger.thumb
            return key
        }
        return item
    })
}
