import Key from "../Model/Key"
import hideRightColumn from "./hideRightColumn"
import moveBar from "./moveBar"
import moveBS from "./moveBS"
import moveCtrl from "./moveCtrl"
import moveDelete from "./moveDelete"
import moveEnter from "./moveEnter"
import moveEsc from "./moveEsc"
import moveMO from "./moveMO"
import moveRCtrl from "./moveRCtrl"
import moveRightHandKeyzz from "./moveRightHandKeyzz"
import moveRow0 from "./moveRow0"
import moveRow5 from "./moveRow5"
import setKeyWidth from "./setKeyWidth"
import setSecondKey from "./setSecondKey"
import showSecond from "./showSecond"

class Action {
    constructor(readonly description: string, readonly method: Method) {}
}

interface Method {
    (keyzz: Key[]): Key[]
}

export default function makeActionzz() {
    return actionzz
}

export function getAction(index: number) {
    if (index < actionzz.length) {
        return actionzz[index]
    }
    return null
}

export function runAll(keyzz: Key[]) {
    for (const item of actionzz) {
        keyzz = item.method(keyzz)
    }
    return keyzz
}

const actionzz: Action[] = [
    new Action("设置键宽度为 1", setKeyWidth),
    new Action("将右手负责的键向右移动 2", moveRightHandKeyzz),
    new Action("移动 Esc 键", moveEsc),
    new Action("移动第一行的键", moveRow0),
    new Action("移动 Enter 键", moveEnter),
    //   new Action("移动 | 键",    moveBar, ),
    new Action("移动 Backspace 键", moveBS),
    new Action("移动 Delete 键", moveDelete),
    new Action("增加 MO(1) 键", moveMO),
    new Action("移动 Ctrl 键", moveCtrl),
    new Action("移动 RCtrl 键", moveRCtrl),
    new Action("调整空格键宽度", moveRow5),
    new Action("显示第二层的键", showSecond),
    new Action("添加更多键", setSecondKey),
    new Action("移除 3 个太远的键", hideRightColumn),
]
