class Table {
    readonly rowxx: Row[]

    constructor(readonly result1: Result, readonly result2: Result) {
        this.rowxx = []
        this.rowxx.push(new Row("burden", "", "", "", ""))
        const fingerxx = Array.from(result1.map.keys())
        fingerxx.forEach((finger) => {
            const label = Finger[finger] + " finger"
            const stroke1 = result1.map.get(finger)!.stroke
            const stroke2 = result2.map.get(finger)!.stroke
            this.rowxx.push(
                new Row(
                    label,
                    ((stroke1 / result1.totalStroke) * 100).toFixed(1) + " %",
                    ((stroke2 / result2.totalStroke) * 100).toFixed(1) + " %",
                    "",
                    ""
                )
            )
        })

        this.rowxx.push(new Row("total", "", "", "", ""))
        this.rowxx.push(
            this.make(
                "total " + LabelEnum.distance,
                result1.totalDistance,
                result2.totalDistance,
                true
            )
        )
        this.rowxx.push(
            this.make(
                "total " + LabelEnum.stroke,
                result1.totalStroke,
                result2.totalStroke
            )
        )
        this.rowxx.push(
            this.make(
                "total " + LabelEnum.stroke2,
                result1.totalStroke2,
                result2.totalStroke2
            )
        )

        fingerxx.forEach((finger) => {
            const label = Finger[finger] + " finger"
            // console.log(label)
            // console.log(result1.map.get(finger)!.letterSet)
            // console.log(result2.map.get(finger)!.letterSet)
            this.rowxx.push(new Row(label, "", "", "", ""))
            this.rowxx.push(
                this.make(
                    LabelEnum.distance,
                    result1.map.get(finger)!.distance,
                    result2.map.get(finger)!.distance,
                    true
                )
            )
            this.rowxx.push(
                this.make(
                    LabelEnum.stroke,
                    result1.map.get(finger)!.stroke,
                    result2.map.get(finger)!.stroke
                )
            )
            this.rowxx.push(
                this.make(
                    LabelEnum.stroke2,
                    result1.map.get(finger)!.stroke2,
                    result2.map.get(finger)!.stroke2
                )
            )
        })
    }

    make(label: string, value1: number, value2: number, real = false) {
        if (value1 === 0) {
            if (value2 === 0) {
                return new Row(label, "0", "0", "0", "0")
            }
            return new Row(
                label,
                "0",
                value2.toFixed(1),
                value2.toFixed(1),
                "+100.0 %"
            )
        }

        const difference = value2 - value1
        const rate = (difference / value1) * 100
        let sign = ""
        if (difference > 0) {
            sign = "+"
        }
        if (real) {
            return new Row(
                label,
                value1.toFixed(1),
                value2.toFixed(1),
                sign + difference.toFixed(1),
                sign + rate.toFixed(1) + " %"
            )
        }
        return new Row(
            label,
            value1.toString(),
            value2.toString(),
            sign + difference.toString(),
            sign + rate.toFixed(1) + " %"
        )
    }
}

enum LabelEnum {
    distance = "distance",
    stroke = "stroke",
    stroke2 = "stroke<br>(distance > 1)",
}

class Row {
    constructor(
        readonly label: string,
        readonly value1: string,
        readonly value2: string,
        readonly value3: string,
        readonly value4: string
    ) {}
}
