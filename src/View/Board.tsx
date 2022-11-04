import { useState } from "react"
import data from "../keyzz.json"
import loadKeyzz from "../Helper/loadKeyzz"
import Key from "../Model/Key"
import Box from "./Box"

export default function Board() {
    const [keyzz, setKeyzz] = useState<Key[]>(loadKeyzz(data))

    return (
        <div
            className="relative"
        >
            {keyzz.map((item) => (
                <Box item={item} key={item.text}></Box>
            ))}
        </div>
    )
}
