class FingerPosition {
    constructor(
        readonly fingerRow: number,
        readonly thumbRow: number,
        readonly leftIndexFingerColumn: number,
        readonly rightIndexFingerColumn: number
    ) {}

    column(finger: Finger, left: boolean) {
        if (finger === Finger.thumb) {
            if (left) {
                return this.leftIndexFingerColumn + 1
            }
            return this.rightIndexFingerColumn - 1
        }

        const list = [Finger.index, Finger.middle, Finger.ring, Finger.little]
        const offset = list.indexOf(finger)
        if (left) {
            return this.leftIndexFingerColumn - offset
        }
        return this.rightIndexFingerColumn + offset
    }

    row(finger: Finger) {
        if (finger === Finger.thumb) {
            return this.thumbRow
        }

        return this.fingerRow
    }
}
