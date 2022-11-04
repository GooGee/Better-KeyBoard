import Key from "../Model/Key"

export default function moveMO(keyzz: Key[]) {
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.text === "MO(1)") {
            key.x = 5
            return key
        }
        return key
    })
}
