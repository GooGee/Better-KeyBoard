import { animated, useSpring } from "react-spring"
import Finger from "../Model/Finger"
import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

interface Property {
    finger: Finger
    leftHand: boolean
    item: Key
    old: Key
    second: boolean
    setFinger(item?: Key): void
    setSecond(second: boolean): void
}

const topKeyzz = new Set([
    KeyEnum.BS as string,
    KeyEnum.Ctrl,
    KeyEnum.Delete,
    KeyEnum.Enter,
    KeyEnum.Esc,
    KeyEnum.RCtrl,
])

function makeStyle(item: Key) {
    return {
        left: item.left,
        top: item.top,
        width: item.width,
        height: item.height,
    }
}

export default function Box(property: Property) {
    function getBGC() {
        if (property.item.text === KeyEnum.MO1 && property.second) {
            return "#ccc"
        }

        if (property.finger === Finger.unknown) {
            return ""
        }

        if (
            property.finger === property.item.finger &&
            (property.leftHand === property.item.leftHand ||
                property.finger === Finger.thumb)
        ) {
            return "#eee"
        }

        return ""
    }

    return (
        <animated.div
            className="key-box absolute py-1 px-2"
            style={{
                ...useSpring({
                    to: makeStyle(property.item),
                    from: makeStyle(property.old),
                }),
                backgroundColor: getBGC(),
                zIndex: topKeyzz.has(property.item.text) ? 11 : 1,
            }}
            onMouseEnter={function () {
                property.setFinger(property.item)
            }}
            onMouseLeave={function () {
                property.setFinger()
            }}
            onClick={function () {
                if (property.item.text === KeyEnum.MO1) {
                    property.setSecond(!property.second)
                }
            }}
        >
            <pre
                className={
                    "h-12 whitespace-pre-wrap overflow-hidden" +
                    (property.second
                        ? property.item.gray
                            ? " text-slate-400"
                            : ""
                        : "")
                }
            >
                {property.second ? property.item.second : property.item.text}
            </pre>
            {property.item.text === KeyEnum.Semicolon ? (
                <span className="relative left-4 bottom-5 text-red-500">小</span>
            ) : (
                ""
            )}
        </animated.div>
    )
}
