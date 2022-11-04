import Key from "../Model/Key"

export default function moveEsc(keyzz: Key[]) {
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.x === 0 && key.y === 0) {
            key.x = 6
            key.y = 3.5
            key.h = 2
            return key
        }
        return key
    })
}
