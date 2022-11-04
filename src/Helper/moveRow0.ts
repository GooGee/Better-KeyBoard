import Key from "../Model/Key"

export default function moveRow0(keyzz: Key[]) {
    let x = 0
    return keyzz.map(function (item) {
        if (item.y > 0) {
            return item
        }

        const key = item.clone()
        key.x = x + Math.floor(x / 4)
        x += 1
        return key
    })
}
