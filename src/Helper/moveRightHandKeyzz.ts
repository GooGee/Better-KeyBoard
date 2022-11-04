import Key from "../Model/Key"

export default function moveRightHandKeyzz(keyzz: Key[]) {
    return keyzz.map(function (item) {
        const key = item.clone()
        if (key.y === 0) {
            return key
        }
        if (key.text === "Delete") {
            return key
        }
        if (key.y < 5 && key.leftHand === false) {
            key.x += 2
        }
        return key
    })
}
