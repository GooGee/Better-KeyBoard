import { useState } from "react"
import Key from "../Model/Key"
import KeyEnum from "../Model/KeyEnum"

interface Property {
    item: Key
    second: boolean
    setSecond(second: boolean): void
}

export default function Box(property: Property) {
    const [down, setDown] = useState(false)

    return (
        <div
            className="key-box absolute py-1 px-2"
            style={{
                display: "inline-block",
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
            <pre className="whitespace-pre-wrap">
                {property.second ? property.item.second : property.item.text}
            </pre>
        </div>
    )
}
