import { ReactNode } from "react"

interface Property {
    children: ReactNode
    tip: ReactNode
}

export default function ToolTip(property: Property) {
    return (
        <span className="cursor-pointer group relative inline-block text-blue-500 hover:text-red-500 duration-300">
            {property.children}
            <span className="absolute hidden group-hover:flex -left-1 -top-1 -translate-y-full w-22 px-2 py-1 bg-slate-100 border border-slate-500 border-solid rounded-lg text-black">
                {property.tip}
            </span>
        </span>
    )
}
