import Key from "../Model/Key"
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

interface Action {
    (data: Key[]): Key[]
}

const stepzz: Action[] = [
    setKeyWidth,
    moveRightHandKeyzz,
    moveEsc,
    moveRow0,
    moveEnter,
    moveBar,
    moveBS,
    moveDelete,
    moveMO,
    moveCtrl,
    moveRCtrl,
    moveRow5,
    showSecond,
    setSecondKey,
]

export default function runAction(index: number, keyzz: Key[]) {
    if (index < stepzz.length) {
        const action = stepzz[index]
        return action(keyzz)
    }
    return null
}
