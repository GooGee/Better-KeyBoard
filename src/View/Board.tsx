import { useState } from "react"
import hideRightColumn from "../Helper/hideRightColumn"
import loadKeyzz from "../Helper/loadKeyzz"
import { getAction } from "../Helper/makeActionzz"
import moveBS from "../Helper/moveBS"
import moveRightHandKeyzz from "../Helper/moveRightHandKeyzz"
import showSecond from "../Helper/showSecond"
import Finger from "../Model/Finger"
import Key from "../Model/Key"
import { Width14, Width15, Width16 } from "./App"
import Box from "./Box"
import ResultModal from "./ResultModal"

interface Property {
    setWidth(width: number): void
}

const top = "488px"

const data = loadKeyzz()
const map = new Map(data.map((item) => [item.text, item]))

export default function Board(property: Property) {
    const [finger, setFinger] = useState<Key>()
    const [keyzz, setKeyzz] = useState<Key[]>(data)
    const [second, setSecond] = useState(false)
    const [step, setStep] = useState(0)
    const [visible, setVisible] = useState(false)

    const action = getAction(step)

    function runAction() {
        if (action === null) {
            property.setWidth(Width15)
            setKeyzz(data)
            setSecond(false)
            setStep(0)
            return
        }

        if (Object.is(action.method, moveRightHandKeyzz)) {
            property.setWidth(Width16)
        }
        if (Object.is(action.method, moveBS)) {
            property.setWidth(Width15)
        }
        if (Object.is(action.method, showSecond)) {
            setSecond(true)
        }
        if (Object.is(action.method, hideRightColumn)) {
            property.setWidth(Width14)
        }
        setKeyzz(action.method(keyzz))
        setStep(step + 1)
    }

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

            <div style={{ position: "absolute", left: "0", top, width: "100%" }}>
                <button
                    className="rounded-full border-2 border-sky-500 hover:bg-sky-500 px-4 py-2 ml-3"
                    type="button"
                    onClick={function () {
                        setVisible(true)
                    }}
                >
                    统计
                </button>

                {action === null ? (
                    <button
                        className="rounded-full border-2 border-red-500 hover:bg-red-500 px-4 py-2 ml-3"
                        type="button"
                        onClick={runAction}
                    >
                        重置
                    </button>
                ) : (
                    <button
                        className="rounded-full border-2 border-sky-500 hover:bg-sky-500 px-4 py-2 ml-3"
                        type="button"
                        onClick={runAction}
                    >
                        {action.description}
                    </button>
                )}

                <div className="absolute right-2 bottom-2">
                    <a
                        href="https://github.com/GooGee/Better-KeyBoard"
                        target="_blank"
                        className="text-slate-500 hover:text-black"
                    >
                        <svg
                            height="24"
                            width="24"
                            viewBox="0 0 16 16"
                            version="1.1"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                            ></path>
                        </svg>
                    </a>
                </div>
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
