import { useState } from "react"
import { BoxWidth } from "../Model/Key"
import Board from "./Board"

export const Width15 = 988
export const Width16 = Width15 + BoxWidth
export const Width17 = Width16 + BoxWidth

export default function App() {
    const [width, setWidth] = useState(Width15)

    let marginLeft: string | number = 0
    if (window.innerWidth > Width17) {
        marginLeft = Math.floor((window.innerWidth - Width17) / 2) + "px"
    }

    return (
        <div className="container p-3">
            <div
                className="overflow-hidden rounded-xl border border-slate-200 py-5 px-3"
                style={{
                    width: width + "px",
                    height: "566px",
                    marginLeft,
                    backgroundColor: "#e3e3e3",
                    boxShadow: "inset 0 1px 0px #f1f1f1, 0 3px 3px 3px #303038",
                }}
            >
                <Board setWidth={setWidth}></Board>
            </div>
        </div>
    )
}
