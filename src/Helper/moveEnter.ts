import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveEnter(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === KeyEnum.Enter) {
            const key = item.clone()
            key.x = 7
            key.y += 1
            key.h = 2
            return key
        }
        return item
    })
}
