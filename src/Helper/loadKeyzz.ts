import Finger from "../Model/Finger"
import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"
import grid from "../keyzz.json"

interface KeyData {
    x: number
    y: number
    w: number
    h: number
    text: string
    second: string
}

const farKeyzz = [
    KeyEnum.Esc,
    KeyEnum.Wave,
    KeyEnum.Ctrl,
    KeyEnum.RCtrl,

    KeyEnum.Minus,
    KeyEnum.Equal,
    KeyEnum.BS,
    KeyEnum.Delete,

    KeyEnum.Square2,
    KeyEnum.Enter,

    KeyEnum.Bar,
]

const topKeyzz = [
    KeyEnum.BS,
    KeyEnum.Ctrl,
    KeyEnum.Delete,
    KeyEnum.Enter,
    KeyEnum.Esc,
    KeyEnum.RCtrl,
]

export function prepareKey(map: Map<string, Key>) {
    topKeyzz.forEach((item) => (map.get(item)!.zIndex = 11))
    farKeyzz.forEach((item) => (map.get(item)!.far = true))
}

export default function loadKeyzz() {
    const keyzz: Key[] = []
    grid.forEach(function (kdzz, yi) {
        if (yi === 5) {
            makeLastRow(keyzz, kdzz)
            return
        }
        kdzz.forEach(function (kd, xi) {
            keyzz.push(makeKey(kd, xi, yi))
        })
    })

    return keyzz
}

function makeKey(kd: KeyData, xi: number, yi: number) {
    const far = yi <= 1 ? true : false
    let finger = Finger.thumb
    const x = xi - (yi === 0 ? 1 : 0)
    if (x <= 1 || x >= 10) {
        finger = Finger.little
    } else if (x === 2 || x === 9) {
        finger = Finger.ring
    } else if (x === 3 || x === 8) {
        finger = Finger.middle
    } else {
        finger = Finger.index
    }

    return new Key(kd.x, kd.y, kd.w, kd.h, x < 6, finger, kd.text, kd.second, 1, far)
}

function makeLastRow(keyzz: Key[], kdzz: KeyData[]) {
    let index = 0
    keyzz.push(
        new Key(
            kdzz[index].x,
            kdzz[index].y,
            kdzz[index].w,
            kdzz[index].h,
            true,
            Finger.little,
            kdzz[index].text,
            kdzz[index].second,
        ),
    )
    index += 1
    keyzz.push(
        new Key(
            kdzz[index].x,
            kdzz[index].y,
            kdzz[index].w,
            kdzz[index].h,
            true,
            Finger.little,
            kdzz[index].text,
            kdzz[index].second,
        ),
    )
    index += 1
    keyzz.push(
        new Key(
            kdzz[index].x,
            kdzz[index].y,
            kdzz[index].w,
            kdzz[index].h,
            true,
            Finger.thumb,
            kdzz[index].text,
            kdzz[index].second,
        ),
    )
    index += 1
    keyzz.push(
        new Key(
            kdzz[index].x,
            kdzz[index].y,
            kdzz[index].w,
            kdzz[index].h,
            true,
            Finger.thumb,
            kdzz[index].text,
            kdzz[index].second,
        ),
    )
    index += 1
    keyzz.push(
        new Key(
            kdzz[index].x,
            kdzz[index].y,
            kdzz[index].w,
            kdzz[index].h,
            false,
            Finger.thumb,
            kdzz[index].text,
            kdzz[index].second,
        ),
    )
    index += 1
    keyzz.push(
        new Key(
            kdzz[index].x,
            kdzz[index].y,
            kdzz[index].w,
            kdzz[index].h,
            false,
            Finger.little,
            kdzz[index].text,
            kdzz[index].second,
        ),
    )
    index += 1
    keyzz.push(
        new Key(
            kdzz[index].x,
            kdzz[index].y,
            kdzz[index].w,
            kdzz[index].h,
            false,
            Finger.little,
            kdzz[index].text,
            kdzz[index].second,
        ),
    )
    index += 1
    keyzz.push(
        new Key(
            kdzz[index].x,
            kdzz[index].y,
            kdzz[index].w,
            kdzz[index].h,
            false,
            Finger.little,
            kdzz[index].text,
            kdzz[index].second,
        ),
    )
}
