import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveCtrl(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === KeyEnum.Ctrl) {
            const key = item.clone()
            key.x = 3
            key.y += 1
            key.w = 2
            return key
        }
        return item
    })
}
