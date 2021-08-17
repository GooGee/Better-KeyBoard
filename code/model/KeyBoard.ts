class KeyBoard {
    readonly column: number
    readonly row: number
    readonly fingerRow: number
    readonly leftIndexFingerColumn: number
    readonly rightIndexFingerColumn: number
    readonly keyxx: Key[]
    readonly position: FingerPosition

    constructor(readonly data: Preset) {
        this.column = data.column
        this.row = data.row
        this.fingerRow = data.fingerRow
        this.leftIndexFingerColumn = data.leftIndexFingerColumn
        this.rightIndexFingerColumn = data.rightIndexFingerColumn
        this.keyxx = new Array(data.row * data.column)
        let index = 0
        for (let yyy = 0; yyy < data.row; yyy++) {
            for (let xxx = 0; xxx < data.column; xxx++) {
                const key = new Key(xxx, yyy, 1, 1)
                this.keyxx[index] = key
                data.layerxx.forEach((layer, li) => {
                    key.textxx[li] = layer.rowxx[yyy][xxx]
                })
                index += 1
            }
        }

        this.position = new FingerPosition(
            data.fingerRow,
            data.thumbRow,
            data.leftIndexFingerColumn,
            data.rightIndexFingerColumn
        )
        this.setLeftIndexFinger(data.fingerRow, data.leftIndexFingerColumn)
        this.setRightIndexFinger(data.fingerRow, data.rightIndexFingerColumn)
    }

    computeDistance(x1: number, y1: number, x2: number, y2: number) {
        const sum = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
        return Math.sqrt(sum)
    }

    fill(layer: number, row: number, keyxx: string[]) {
        let index = row * this.column
        for (const key of keyxx) {
            this.keyxx[index].setKey(layer, key)
            index += 1
        }
    }

    getLayerKey(index: number) {
        return this.data.layerxx[index].key
    }

    bindKeyFinger(row: number, column: number, left: boolean, finger: Finger) {
        const index = row * this.column + column
        const found = this.keyxx[index]
        if (found) {
            found.left = left
            found.finger = finger
            found.distance = this.computeDistance(
                column,
                row,
                this.position.column(finger, left),
                this.position.row(finger)
            )
        }
    }

    setLeftIndexFinger(row: number, column: number) {
        const middle =
            (this.leftIndexFingerColumn + this.rightIndexFingerColumn + 1) >> 1
        for (let yyy = 0; yyy < row + 2; yyy++) {
            for (let xxx = 0; xxx <= column - 3; xxx++) {
                this.bindKeyFinger(yyy, xxx, true, Finger.little)
            }
            this.bindKeyFinger(yyy, column - 2, true, Finger.ring)
            this.bindKeyFinger(yyy, column - 1, true, Finger.middle)
            for (let xxx = column; xxx < middle; xxx++) {
                this.bindKeyFinger(yyy, xxx, true, Finger.index)
            }
        }
        for (let yyy = row + 2; yyy < this.row; yyy++) {
            // left 2 keys
            this.bindKeyFinger(yyy, 0, true, Finger.little)
            this.bindKeyFinger(yyy, 1, true, Finger.little)
            for (let xxx = 2; xxx < middle; xxx++) {
                this.bindKeyFinger(yyy, xxx, true, Finger.thumb)
            }
        }
    }

    setRightIndexFinger(row: number, column: number) {
        const middle =
            (this.leftIndexFingerColumn + this.rightIndexFingerColumn + 1) >> 1
        for (let yyy = 0; yyy < row + 2; yyy++) {
            for (let xxx = middle; xxx <= column; xxx++) {
                this.bindKeyFinger(yyy, xxx, false, Finger.index)
            }
            this.bindKeyFinger(yyy, column + 1, false, Finger.middle)
            this.bindKeyFinger(yyy, column + 2, false, Finger.ring)
            for (let xxx = column + 3; xxx < this.column; xxx++) {
                this.bindKeyFinger(yyy, xxx, false, Finger.little)
            }
        }
        for (let yyy = row + 2; yyy < this.row; yyy++) {
            // right 2 keys
            this.bindKeyFinger(yyy, this.column - 1, false, Finger.little)
            this.bindKeyFinger(yyy, this.column - 2, false, Finger.little)
            for (let xxx = middle; xxx < this.column - 2; xxx++) {
                this.bindKeyFinger(yyy, xxx, false, Finger.thumb)
            }
        }
    }
}
