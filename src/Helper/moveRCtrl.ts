import Key from "../Model/Key"

export default function moveRCtrl(keyzz: Key[]) {
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.text === "RCtrl") {
            key.x = 9
            key.y += 1
            key.w = 2
            return key
        }
        return key
    })
}
