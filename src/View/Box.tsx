import Key from "../Model/Key"

interface Property {
    item: Key
}

export default function Box(property: Property) {
    return (
        <div
            className="absolute border border-slate-200 p-2"
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
