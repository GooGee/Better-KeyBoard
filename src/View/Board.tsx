import { useState } from "react"
import loadKeyzz from "../Helper/loadKeyzz"
import Key from "../Model/Key"
import grid from "../keyzz.json"
import Box from "./Box"
import runAction from "../Helper/runAction"

interface Property {
    setWide(wide: boolean): void
}

const data = loadKeyzz(grid)

export default function Board(property: Property) {
    const [keyzz, setKeyzz] = useState<Key[]>(data)
    const [second, setSecond] = useState(false)
    const [step, setStep] = useState(0)

    return (
        <div className="relative">
            {keyzz.map((item) => (
                <Box
                    item={item}
                    key={item.text}
                    second={second}
                    setSecond={setSecond}
                ></Box>
            ))}

            <button
                className="rounded-full border border-red-500 hover:bg-red-500 px-4 py-2"
                type="button"
                style={{ position: "absolute", left: "0", top: "444px" }}
                onClick={function () {
                    setKeyzz(data)
                    setSecond(false)
                    setStep(0)
                }}
            >
                reset
            </button>

            <button
                className="rounded-full border border-sky-500 hover:bg-sky-500 px-4 py-2"
                type="button"
                style={{ position: "absolute", left: "111px", top: "444px" }}
                onClick={function () {
                    const result = runAction(step, keyzz)
                    if (result) {
                        if (step === 1) {
                            property.setWide(true)
                        }
                        if (step === 5) {
                            property.setWide(false)
                        }
                        if (step >= 11) {
                            setSecond(true)
                        }
                        setKeyzz(result)
                        setStep(step + 1)
                    }
                }}
            >
                next
            </button>
        </div>
    )
}
