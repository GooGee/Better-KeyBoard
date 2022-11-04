import Key from "../Model/Key"

export default function moveBar(keyzz: Key[]) {
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.text === "|\n\\") {
            key.x -= 1
            key.y += 1
            return key
        }
        return key
    })
}
