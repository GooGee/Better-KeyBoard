class Key {
    /**
     *
     * @param {string} label
     * @param {string} down
     * @param {number} width
     * @param {number} height
     * @param {number} x
     * @param {number} y
     */
    constructor(label, down = "", width = 1, height = 1, x = 0, y = 0) {
        this.top = label
        this.down = down
        this.width = width
        this.height = height
        this.x = x
        this.y = y

        const list = label.match(/^([a-zA-Z]+)\((\d)\)$/)
        if (list === null) {
            this.method = ""
            this.layer = 0
        } else {
            this.method = list[1]
            this.layer = parseInt(list[2])
        }
    }

    /**
     *
     * @param {Row} row
     */
    css(Row) {
        return `image${this.height}${this.width}`
    }

    /**
     *
     * @param {Row} row
     */
    style(row) {
        const list = []
        list.push(`left: ${this.x * 64}px`)
        list.push(`top: ${this.y * 64}px`)
        list.push(`height: ${this.height * 64}px`)
        list.push(`width: ${this.width * 64}px`)
        return list.join("; ")
    }

    wh() {
        const list = []
        list.push(`height: ${this.height * 64}px`)
        list.push(`width: ${this.width * 64}px`)
        return list.join("; ")
    }

    /**
     *
     * @param {Object} data
     */
    load(data) {
        if (data.w) {
            this.width = data.w
        }
        if (data.h) {
            this.height = data.h
        }
    }

    get label() {
        return this.top
    }

    set label(label) {
        this.top = label
    }
}

class Row {
    constructor(index) {
        this.index = index
        this.keyxx = []
    }

    /**
     *
     * @param {string[]} list
     */
    load(list) {
        let index = 0
        let width = 0
        let last = null
        list.forEach((item) => {
            if ("object" === typeof item) {
                if (item.x) {
                    index += item.x
                }
                last = item
                return
            }

            const wordxx = item.split("\n")
            const key = new Key(wordxx[0], wordxx[1], 1, 1, index, this.index)
            this.keyxx.push(key)
            if (last) {
                key.x += width
                key.load(last)
                if (last.w) {
                    width += last.w - 1
                }
                last = null
            }
            index += 1
        })
    }
}

class Board {
    constructor() {
        this.rowxx = []
    }

    /**
     *
     * @param {string[][]} data
     */
    load(data) {
        let index = 0
        data.forEach((list) => {
            if (list[0].y) {
                index += list[0].y
            }
            const row = new Row(index)
            row.load(list)
            this.rowxx.push(row)
            index += 1
        })
    }
}
