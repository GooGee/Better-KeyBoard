import Key from "../Model/Key"

export default function moveMO(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.text === "MO(1)") {
            const key = item.clone()
            key.x = 5
            return key
        }
        return item
    })
}
