import { useEffect, useState } from "react"
import { animated, useSpring } from "react-spring"
import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

interface Property {
    item: Key
    old: Key
    second: boolean
    setSecond(second: boolean): void
}

function makeStyle(item: Key) {
    return {
        left: item.left,
        top: item.top,
        width: item.width,
        height: item.height,
    }
}

export default function Box(property: Property) {
    const [down, setDown] = useState(false)

    const style = useSpring({
        to: makeStyle(property.item),
        from: makeStyle(property.old),
    })

    useEffect(() => {
        if (property.item.text === KeyEnum.MO1) {
            setDown(property.second)
        }
    }, [property.item, property.second])

    return (
        <animated.div
            className="key-box absolute py-1 px-2"
            style={{
                ...style,
                backgroundColor: down ? "#eee" : "",
                zIndex: property.item.zIndex,
            }}
            onMouseDown={function () {
                setDown(true)
                if (property.item.text === KeyEnum.MO1) {
                    property.setSecond(true)
                }
            }}
            onMouseUp={function () {
                setDown(false)
                property.setSecond(false)
            }}
        >
            <pre
                className={
                    "h-12 whitespace-pre-wrap" +
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
