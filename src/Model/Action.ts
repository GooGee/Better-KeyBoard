import Key from "./Key"

export default class Action {
    constructor(readonly description: string, readonly method: Method) {}
}

interface Method {
    (data: Key[]): Key[]
}
