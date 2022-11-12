import Key from "../Model/Key"

export default function hideRightColumn(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.x === 14) {
            const key = item.clone()
            key.x = 16
            return key
        }
        return item
    })
}
