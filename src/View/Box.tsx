import { useEffect, useState } from "react"
import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

interface Property {
    item: Key
    second: boolean
    setSecond(second: boolean): void
}

export default function Box(property: Property) {
    const [down, setDown] = useState(false)

    useEffect(() => {
        if (property.item.text === KeyEnum.MO1) {
            setDown(property.second)
        }
    }, [property.item, property.second])

    return (
        <div
            className="key-box absolute py-1 px-2"
            style={{
                left: property.item.left,
                top: property.item.top,
                width: property.item.width,
                height: property.item.height,
                backgroundColor: down ? "#eee" : "",
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
        </div>
    )
}
