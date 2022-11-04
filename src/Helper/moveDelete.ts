import Key from "../Model/Key"

export default function moveDelete(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === "Delete") {
            const key = item.clone()
            key.x = 7
            key.y = 1.5
            key.h = 2
            return key
        }
        return item
    })
}
