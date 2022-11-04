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
                className="overflow-hidden rounded-xl border border-slate-200 py-5 px-3"
                style={{
                    width: (wide ? WidthMax : WidthMin) + "px",
                    height: "550px",
                    marginLeft,
                    backgroundColor: "#e3e3e3",
                    boxShadow: "inset 0 1px 0px #f1f1f1, 0 3px 3px 3px #303038",
                }}
            >
                <Board setWide={setWide}></Board>
            </div>
        </div>
    )
}
