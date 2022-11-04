import Key from "../Model/Key"

export default function moveRow5(keyzz: Key[]) {
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.text === "Win") {
            key.x = 1
            key.w = 2
            return key
        }
        if (key.text === "Alt") {
            key.x = 3
            key.w = 2
            return key
        }
        if (key.text === "") {
            key.x = 5
            key.w = 4
            return key
        }
        if (key.text === "RAlt") {
            key.x = 9
            key.w = 2
            return key
        }
        if (key.text === "RWin") {
            key.x = 11
            key.w = 2
            return key
        }
        if (key.text === "Menu") {
            key.x = 13
            key.w = 1
            return key
        }
        return key
    })
}
