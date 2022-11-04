import { useState } from "react"
import Board from "./Board"

const WidthMax = 1055
const WidthMin = 990

export default function App() {
    const [wide, setWide] = useState(false)

    let marginLeft: string | number = 0
    if (window.innerWidth > WidthMax) {
        marginLeft = Math.floor((window.innerWidth - WidthMax) / 2) + "px"
    }

    return (
        <div className="container p-3">
            <div
                className="overflow-hidden rounded-xl border border-slate-200 p-3"
                style={{
                    width: (wide ? WidthMax : WidthMin) + "px",
                    height: "520px",
                    marginLeft,
                    backgroundColor: "#e3e3e3",
                    boxShadow: "inset 1px 1px 0px #f1f1f1, 3px 3px 6px 3px #303038",
                }}
            >
                <Board setWide={setWide}></Board>
            </div>
        </div>
    )
}
