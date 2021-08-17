class Result {
    readonly totalDistance: number
    readonly totalStroke: number
    readonly totalStroke2: number

    constructor(
        readonly data: Preset,
        readonly map: Map<Finger, FingerMovement>,
        readonly set: Set<string>
    ) {
        let distance = 0
        let stroke = 0
        let stroke2 = 0
        for (const item of map.values()) {
            distance += item.distance
            stroke += item.stroke
            stroke2 += item.stroke2
        }

        this.totalDistance = distance
        this.totalStroke = stroke
        this.totalStroke2 = stroke2
    }
}
