import Key from "../Model/Key"

export default function setKeyWidth(keyzz: Key[]) {
    let x = 0
    let y = 0
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.y === 0) {
            return key
        }
        if (key.text === "Delete") {
            return key
        }
        if (y === key.y) {
            x += 1
        } else {
            y = key.y
            x = 0
        }
        if (key.y < 5) {
            key.w = 1
            key.x = x
        }
        return key
    })
}
