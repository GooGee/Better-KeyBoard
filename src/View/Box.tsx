import Key from "../Model/Key"

interface Property {
    item: Key
}

export default function Box(property: Property) {
    return (
        <div
            className="key-box absolute py-1 px-2"
            style={{
                display: "inline-block",
                left: property.item.left,
                top: property.item.top,
                width: property.item.width,
                height: property.item.height,
            }}
        >
            <pre className="whitespace-pre-wrap">{property.item.text}</pre>
        </div>
    )
}
