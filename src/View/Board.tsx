import { useState } from "react"
import loadKeyzz from "../Helper/loadKeyzz"
import Key from "../Model/Key"
import grid from "../keyzz.json"
import Box from "./Box"
import { getAction } from "../Helper/makeActionzz"

interface Property {
    setWide(wide: boolean): void
}

const data = loadKeyzz(grid)
const map = new Map(data.map((item) => [item.text, item]))

export default function Board(property: Property) {
    const [keyzz, setKeyzz] = useState<Key[]>(data)
    const [second, setSecond] = useState(false)
    const [step, setStep] = useState(0)

    const action = getAction(step)

    return (
        <div className="relative">
            {keyzz.map((item) => (
                <Box
                    item={item}
                    old={map.get(item.text)!}
                    key={item.text}
                    second={second}
                    setSecond={setSecond}
                ></Box>
            ))}

            <div style={{ position: "absolute", left: "0", top: "488px" }}>
                <button
                    className="rounded-full border border-red-500 hover:bg-red-500 px-4 py-2"
                    type="button"
                    onClick={function () {
                        setKeyzz(data)
                        setSecond(false)
                        setStep(0)
                    }}
                >
                    重置
                </button>

                {action === null ? null : (
                    <button
                        className="rounded-full border border-sky-500 hover:bg-sky-500 px-4 py-2 ml-3"
                        type="button"
                        onClick={function () {
                            if (action) {
                                if (step === 1) {
                                    property.setWide(true)
                                }
                                if (step === 5) {
                                    property.setWide(false)
                                }
                                if (step >= 11) {
                                    setSecond(true)
                                }
                                setKeyzz(action.method(keyzz))
                                setStep(step + 1)
                            }
                        }}
                    >
                        {action.description}
                    </button>
                )}
            </div>
        </div>
    )
}
