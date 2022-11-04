import Board from "./Board"

export default function App() {
    return (
        <div className="container h-full grid place-content-center p-3">
            <div
                className="overflow-hidden rounded-xl border border-slate-200 p-3"
                style={{
                    width: "1055px",
                    height: "520px",
                    backgroundColor: "#e3e3e3",
                    boxShadow: "inset 1px 1px 0px #f1f1f1, 3px 3px 6px 3px #303038",
                }}
            >
                <Board></Board>
            </div>
        </div>
    )
}
