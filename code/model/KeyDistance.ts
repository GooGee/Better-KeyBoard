class KeyDistance {
    distance: number
    finger: Finger
    layer: number

    constructor(
        readonly text: string,
        distance: number,
        finger: Finger,
        layer: number
    ) {
        this.distance = distance
        this.finger = finger
        this.layer = layer
    }
}
