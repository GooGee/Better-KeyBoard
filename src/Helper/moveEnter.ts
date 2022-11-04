import Key from "../Model/Key"

export default function moveEnter(keyzz: Key[]) {
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.text === "Enter") {
            key.x = 7
            key.y = 3.5
            key.h = 2
            return key
        }
        return key
    })
}
