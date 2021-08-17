interface Layer {
    readonly key: string
    readonly rowxx: string[][]
}

interface Preset {
    name: string
    column: number
    row: number
    fingerRow: number
    thumbRow: number
    leftIndexFingerColumn: number
    rightIndexFingerColumn: number
    layerxx: Layer[]
}
