import Key from "../Model/Key"

export default function setKeyWidth(keyzz: Key[]) {
    let x = 0
    let y = 0
    return keyzz.map(function (item) {
        if (item.y === 0 || item.y > 5) {
            return item
        }
        if (item.text === "Delete") {
            return item
        }
        if (y === item.y) {
            x += 1
        } else {
            y = item.y
            x = 0
        }
        const key = item.clone()
        key.w = 1
        key.x = x
        return key
    })
}
