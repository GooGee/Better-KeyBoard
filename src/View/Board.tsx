import { useState } from "react"
import loadKeyzz, { prepareKey } from "../Helper/loadKeyzz"
import { getAction } from "../Helper/makeActionzz"
import Finger from "../Model/Finger"
import Key from "../Model/Key"
import Box from "./Box"
import ResultModal from "./ResultModal"

interface Property {
    setWide(wide: boolean): void
}

const data = loadKeyzz()
const map = new Map(data.map((item) => [item.text, item]))
prepareKey(map)

export default function Board(property: Property) {
    const [finger, setFinger] = useState<Key>()
    const [keyzz, setKeyzz] = useState<Key[]>(data)
    const [second, setSecond] = useState(false)
    const [step, setStep] = useState(0)
    const [visible, setVisible] = useState(false)

    const action = getAction(step)

    return (
        <div className="relative">
            {keyzz.map((item) => (
                <Box
                    finger={finger?.finger ?? Finger.unknown}
                    leftHand={finger?.leftHand ? true : false}
                    item={item}
                    old={map.get(item.text)!}
                    key={item.text}
                    second={second}
                    setFinger={setFinger}
                    setSecond={setSecond}
                ></Box>
            ))}

            <div style={{ position: "absolute", left: "0", top: "477px" }}>
                <button
                    className="rounded-full border-2 border-sky-500 hover:bg-sky-500 px-4 py-2 ml-3"
                    type="button"
                    onClick={function () {
                        setVisible(true)
                    }}
                >
                    统计
                </button>

                <button
                    className="rounded-full border-2 border-red-500 hover:bg-red-500 px-4 py-2 ml-3"
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
                        className="rounded-full border-2 border-sky-500 hover:bg-sky-500 px-4 py-2 ml-3"
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

            {visible ? (
                <div
                    className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/25"
                    onClick={function () {
                        setVisible(false)
                    }}
                >
                    <div
                        className="bg-white p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <ResultModal></ResultModal>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
