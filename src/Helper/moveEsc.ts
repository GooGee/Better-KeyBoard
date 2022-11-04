import Key from "../Model/Key"

export default function moveEsc(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.x === 0 && item.y === 0) {
            const key = item.clone()
            key.x = 6
            key.y = 3.5
            key.h = 2
            return key
        }
        return item
    })
}
