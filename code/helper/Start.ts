function append(key: KeyDistance, finger: FingerMovement, amount: number) {
    for (let index = 0; index < amount; index++) {
        stroke(key, finger)
    }
}

function compute(
    kb: KeyBoard,
    text: string,
    ignoreSet: Set<string>,
    appendxx: Appendant[]
) {
    // console.log(kb)
    let layer = 0
    const set = new Set<string>()
    const fmm = getFingerMovementMap()
    const kdm = getKeyDistanceMap(kb)
    // console.log(kdm)
    let last = ""
    for (let index = 0; index < text.length; index++) {
        const character = text[index]
        if (ignoreSet.has(character)) {
            continue
        }
        if (kdm.has(character)) {
            const key = kdm.get(character)!
            const finger = fmm.get(key.finger)!
            if (character === last) {
                if (character !== " ") {
                    finger.stroke += 1
                }
                continue
            }
            last = character
            if (key.layer !== layer) {
                if (key.layer > 0) {
                    const text = kb.data.layerxx[key.layer].key
                    const kd = kdm.get(text)
                    if (kd) {
                        const finger = fmm.get(kd.finger)
                        if (finger) {
                            stroke(kd, finger)
                        }
                    }
                }
            }
            stroke(key, finger)
            layer = key.layer
        } else {
            set.add(character)
        }
    }
    appendxx.forEach((item) => {
        if (kdm.has(item.text)) {
            const amount = Math.floor(text.length / item.every)
            const key = kdm.get(item.text)!
            const finger = fmm.get(key.finger)!
            append(key, finger, amount)
        } else {
            set.add(item.text)
        }
    })
    return new Result(kb.data, fmm, set)
}

function getFingerMovementMap() {
    const map = new Map<Finger, FingerMovement>()
    map.set(Finger.thumb, new FingerMovement(Finger.thumb))
    map.set(Finger.index, new FingerMovement(Finger.index))
    map.set(Finger.middle, new FingerMovement(Finger.middle))
    map.set(Finger.ring, new FingerMovement(Finger.ring))
    map.set(Finger.little, new FingerMovement(Finger.little))
    return map
}

function getKeyDistanceMap(kb: KeyBoard) {
    const map = new Map<string, KeyDistance>()
    kb.keyxx.forEach((key) => {
        key.textxx.forEach((item, index) => {
            if (map.has(item)) {
                const kd = map.get(item)!
                if (kd.distance > key.distance) {
                    kd.distance = key.distance
                    kd.finger = key.finger
                    kd.layer = index
                }
            } else {
                map.set(
                    item,
                    new KeyDistance(item, key.distance, key.finger, index)
                )
            }
        })
    })
    const zero = new KeyDistance("", 0, Finger.thumb, 0)
    map.set("\t", map.get("Tab") ?? zero)
    map.set("\n", map.get("Enter") ?? zero)
    const space = map.get(" ")
    if (space) {
        space.distance = 0
    }
    return map
}

function stroke(key: KeyDistance, finger: FingerMovement) {
    finger.stroke += 1
    finger.distance += key.distance
    if (key.distance > 1) {
        finger.stroke2 += 1
    }
    finger.letterSet.add(key)
}

function run(
    text: string,
    data1: Preset,
    data2: Preset,
    ignorexx: string[],
    appendxx: Appendant[]
) {
    const ignoreSet = new Set(ignorexx)
    return new Table(
        compute(new KeyBoard(data1), text, ignoreSet, appendxx),
        compute(new KeyBoard(data2), text, ignoreSet, appendxx)
    )
}
