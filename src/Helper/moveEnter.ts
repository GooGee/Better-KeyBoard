import Key from "../Model/Key"

export default function moveEnter(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === "Enter") {
            const key = item.clone()
            key.x = 7
            key.y = 3.5
            key.h = 2
            return key
        }
        return item
    })
}
