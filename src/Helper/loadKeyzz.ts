import Finger from "../Model/Finger"
import Key from "../Model/Key"

interface KeyData {
    x: number
    y: number
    w: number
    h: number
    text: string
    second: string
}

export default function loadKeyzz(grid: KeyData[][]) {
    const keyzz: Key[] = []
    grid.forEach(function (kdzz, yi) {
        if (yi === 5) {
            makeLastRow(keyzz, kdzz)
            return
        }
        kdzz.forEach(function (kd, xi) {
            keyzz.push(makeKey(kd, xi))
        })
    })

    return keyzz
}

function makeKey(kd: KeyData, xi: number) {
    let finger = Finger.thumb
    if (xi <= 1 || xi >= 10) {
        finger = Finger.little
    }
    return new Key(kd.x, kd.y, kd.w, kd.h, xi < 6, finger, kd.text, kd.second)
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
