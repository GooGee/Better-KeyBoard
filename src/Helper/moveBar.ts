import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveBar(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === KeyEnum.Bar) {
            const key = item.clone()
            key.x -= 1
            key.y += 1
            return key
        }
        return item
    })
}
