class Key {
    /**
     *
     * @param {string} text
     * @param {number} width
     * @param {number} height
     * @param {number} x
     * @param {number} y
     */
    constructor(text, width = 1, height = 1, x = 0, y = 0) {
        const wordxx = text.split("\n")
        this.top = wordxx[0]
        this.down = wordxx[1] ?? ""
        this.width = width
        this.height = height
        this.x = x
        this.y = y

        this._style = ""

        const list = this.top.match(/^([a-zA-Z]+)\((\d)\)$/)
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
        const list = []
        if (this._style) {
            list.push(this._style)
        } else {
            list.push(`image${this.height}${this.width}`)
        }
        if (this.method) {
            list.push("fn")
        }
        return list.join(" ")
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
        if (data.style) {
            this._style = data.style
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

            const key = new Key(item, 1, 1, index, this.index)
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
        this.rowxx = []
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
