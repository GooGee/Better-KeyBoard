class FingerMovement {
    stroke = 0
    stroke2 = 0
    distance = 0
    readonly letterSet = new Set()

    constructor(readonly finger: Finger, readonly name = Finger[finger]) {}
}
