import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

const map: Map<string, string> = new Map([
    [KeyEnum.Tab, "~"],
    [KeyEnum.Caps, "`"],
    [KeyEnum.Shift, "!"],

    [KeyEnum.Q, "/"],
    [KeyEnum.A, "*"],
    [KeyEnum.Z, "0"],

    [KeyEnum.T, "-"],
    [KeyEnum.G, "+"],
    [KeyEnum.B, "="],
    [KeyEnum.Alt, "."],

    [KeyEnum.Y, "Page Up"],
    [KeyEnum.H, "Page Down"],

    [KeyEnum.U, "Home"],
    [KeyEnum.O, "End"],

    [KeyEnum.P, "_"],
    [KeyEnum.Square, "|"],

    [KeyEnum.Semicolon, "-"],
    [KeyEnum.Quote, "\\"],

    [KeyEnum.N, "^"],
    [KeyEnum.M, "&"],
    [KeyEnum.Comma, "("],
    [KeyEnum.Dot, ")"],
    [KeyEnum.Slash, "="],
    [KeyEnum.RShift, ">"],
    
    [KeyEnum.RAlt, "]"],
    [KeyEnum.RWin, "}"],
])

export default function setSecondKey(keyzz: Key[]) {
    return keyzz.map(function (item) {
        const found = map.get(item.text)
        if (found) {
            const key = item.clone()
            key.second = found
            key.gray = true
            return key
        }
        return item
    })
}
