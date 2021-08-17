const LayerAmount = 8

class Key {
    distance: number
    finger: Finger
    left: boolean
    readonly textxx: string[]

    constructor(
        readonly column: number,
        readonly row: number,
        readonly width: number,
        readonly height: number,
        distance: number = 1,
        left: boolean = true,
        finger: Finger = Finger.thumb
    ) {
        this.distance = distance
        this.finger = finger
        this.left = left
        this.textxx = new Array(LayerAmount).fill("")
    }

    find(text: string) {
        return this.textxx.find((key) => key === text)
    }

    setKey(layer: number, key: string) {
        this.textxx[layer] = key
    }
}
