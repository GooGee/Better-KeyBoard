import Key from "../Model/Key"

export default function moveRow0(keyzz: Key[]) {
    let x = 0
    const spacezz = [4, 8]
    return keyzz.map(function (item, index) {
        if (item.y > 0) {
            return item
        }

        const key = item.clone()
        key.x = x
        x += 1
        if (spacezz.includes(index)) {
            x += 1.5
        }
        return key
    })
}
