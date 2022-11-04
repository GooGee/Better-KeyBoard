import Board from "./Board"

export default function App() {
    return (
        <div className="container h-full grid place-content-center p-3">
            <div
                className="overflow-hidden rounded-xl border border-slate-200 p-3"
                style={{
                    width: "1055px",
                    height: "520px",
                }}
            >
                <Board></Board>
            </div>
        </div>
    )
}
