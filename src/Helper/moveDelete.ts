import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

export default function moveDelete(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === KeyEnum.Delete) {
            const key = item.clone()
            key.x = 7
            return key
        }
        return item
    })
}
