import { useState } from "react"
import Board from "./Board"

export const Width14 = 933
export const Width15 = 990
export const Width16 = 1055

export default function App() {
    const [width, setWidth] = useState(Width15)

    let marginLeft: string | number = 0
    if (window.innerWidth > Width16) {
        marginLeft = Math.floor((window.innerWidth - Width16) / 2) + "px"
    }

    return (
        <div className="container p-3">
            <div
                className="overflow-hidden rounded-xl border border-slate-200 py-5 px-3"
                style={{
                    width: width + "px",
                    height: "550px",
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
