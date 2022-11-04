import Key from "../Model/Key"

export default function moveRow0(keyzz: Key[]) {
    let x = 0
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.y > 0) {
            return key
        }

        key.x = x + Math.floor(x / 4)
        x += 1
        return key
    })
}
