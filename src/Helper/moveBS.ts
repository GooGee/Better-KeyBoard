import Key from "../Model/Key"

export default function moveBS(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === "BS") {
            const key = item.clone()
            key.x = 6
            key.y = 1.5
            key.h = 2
            return key
        }
        return item
    })
}
