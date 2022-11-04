import Key from "../Model/Key"

export default function moveCtrl(keyzz: Key[]) {
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.text === "Ctrl") {
            key.x = 3
            key.y += 1
            key.w = 2
            return key
        }
        return key
    })
}
