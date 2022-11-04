import Key from "../Model/Key"

export default function moveBS(keyzz: Key[]) {
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.text === "BS") {
            key.x = 6
            key.y = 1.5
            key.h = 2
            return key
        }
        return key
    })
}
