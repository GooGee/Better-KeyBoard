import Key from "../Model/Key"

export default function hideRightColumn(keyzz: Key[]) {
    return keyzz.map(function (item) {
        if (item.x === 15) {
            const key = item.clone()
            key.x = 17
            return key
        }
        return item
    })
}
