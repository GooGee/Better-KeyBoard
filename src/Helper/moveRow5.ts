import Finger from "../Model/Finger"
import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveRow5(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.y < 5) {
            return item
        }
        const key = item.clone()
        if (key.text === KeyEnum.Win) {
            key.x = 1
            key.w = 2
            key.finger = Finger.thumb
            return key
        }
        if (key.text === KeyEnum.Alt) {
            key.x = 3
            key.w = 2
            return key
        }
        if (key.text === KeyEnum.Space) {
            key.x = 5
            key.w = 4
            return key
        }
        if (key.text === KeyEnum.RAlt) {
            key.x = 9
            key.w = 2
            return key
        }
        if (key.text === KeyEnum.RWin) {
            key.x = 11
            key.w = 2
            key.finger = Finger.thumb
            return key
        }
        if (key.text === KeyEnum.Menu) {
            key.x = 13
            key.w = 1
            return key
        }
        return key
    })
}
