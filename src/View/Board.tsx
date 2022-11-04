import { useState } from "react"
import loadKeyzz from "../Helper/loadKeyzz"
import Key from "../Model/Key"
import grid from "../keyzz.json"
import Box from "./Box"
import runAction from "../Helper/runAction"

interface Property {
    setWide(wide: boolean): void
}

export default function Board(property: Property) {
    const [keyzz, setKeyzz] = useState<Key[]>(loadKeyzz(grid))
    const [step, setStep] = useState(0)

    return (
        <div className="relative">
            {keyzz.map((item) => (
                <Box item={item} key={item.text}></Box>
            ))}

            <button
                className="rounded-full border border-sky-500 hover:bg-sky-500 px-4 py-2"
                type="button"
                style={{ position: "absolute", left: "0", top: "444px" }}
                onClick={function () {
                    const result = runAction(step, keyzz)
                    if (result) {
                        if (step === 1) {
                            property.setWide(true)
                        }
                        if (step === 6) {
                            property.setWide(false)
                        }
                        setKeyzz(result)
                        setStep(step + 1)
                    }
                }}
            >
                +
            </button>
        </div>
    )
}
