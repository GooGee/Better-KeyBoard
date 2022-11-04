import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveMO(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === KeyEnum.MO1) {
            const key = item.clone()
            key.x = 5
            return key
        }
        return item
    })
}
