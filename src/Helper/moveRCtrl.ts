import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveRCtrl(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === KeyEnum.RCtrl) {
            const key = item.clone()
            key.x = 9
            key.y += 1
            key.w = 2
            return key
        }
        return item
    })
}
