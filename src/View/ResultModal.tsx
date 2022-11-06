import { useEffect, useState } from "react"
import compare, { Result } from "../Helper/compare"
import Finger from "../Model/Finger"
import ToolTip from "./ToolTip"

export default function ResultModal() {
    const [result, setResult] = useState<Result>()
    const [uri, setUri] = useState("https://googee.github.io/Better-KeyBoard/es2015.ts")

    useEffect(() => {
        count()
    }, [])

    function count() {
        fetch(uri)
            .then((response) => response.text())
            .then(function (text) {
                setResult(compare(text))
            })
            .catch(alert)
    }

    if (result === undefined) {
        return <table className="h-24 w-24"></table>
    }

    return (
        <table>
            <caption>新布局击键次数变化（对比标准键盘）</caption>
            <tbody>
                <tr>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        小手指击键次数
                    </td>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        <ToolTip
                            tip={
                                <span>
                                    {result.result0.sum(false, Finger.little)}
                                    <br />
                                    {result.result1.sum(false, Finger.little)}
                                </span>
                            }
                        >
                            {result.little}
                        </ToolTip>
                    </td>
                </tr>
                <tr>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        小手指击键次数（左手）
                    </td>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        <ToolTip
                            tip={
                                <span>
                                    {result.result0.left.little.amount}
                                    <br />
                                    {result.result1.left.little.amount}
                                </span>
                            }
                        >
                            {result.littleLeft}
                        </ToolTip>
                    </td>
                </tr>
                <tr>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        小手指击键次数（右手）
                    </td>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        <ToolTip
                            tip={
                                <span>
                                    {result.result0.right.little.amount}
                                    <br />
                                    {result.result1.right.little.amount}
                                </span>
                            }
                        >
                            {result.littleRight}
                        </ToolTip>
                    </td>
                </tr>
                <tr>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        双手击键次数（手指移动距离 &gt; 1）
                    </td>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        <ToolTip
                            tip={
                                <span>
                                    {result.result0.sum(true)}
                                    <br />
                                    {result.result1.sum(true)}
                                </span>
                            }
                        >
                            {result.stroke}
                        </ToolTip>
                    </td>
                </tr>
                <tr>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        左手击键次数（手指移动距离 &gt; 1）
                    </td>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        <ToolTip
                            tip={
                                <span>
                                    {result.result0.left.far}
                                    <br />
                                    {result.result1.left.far}
                                </span>
                            }
                        >
                            {result.strokeLeft}
                        </ToolTip>
                    </td>
                </tr>
                <tr>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        右手击键次数（手指移动距离 &gt; 1）
                    </td>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        <ToolTip
                            tip={
                                <span>
                                    {result.result0.right.far}
                                    <br />
                                    {result.result1.right.far}
                                </span>
                            }
                        >
                            {result.strokeRight}
                        </ToolTip>
                    </td>
                </tr>
                <tr>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        双手击键次数
                    </td>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        <ToolTip
                            tip={
                                <span>
                                    {result.result0.sum()}
                                    <br />
                                    {result.result1.sum()}
                                </span>
                            }
                        >
                            {result.all}
                        </ToolTip>
                    </td>
                </tr>
                <tr>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        移动整只手
                        <br />
                        Esc, ↑ ↓ ← →
                        <br />
                        Backspace, Delete
                    </td>
                    <td className="p-1 border-t border-slate-300 border-solid">
                        -100 %
                    </td>
                </tr>
                <tr>
                    <td
                        className="p-1 border-t border-slate-300 border-solid"
                        colSpan={2}
                    >
                        <input
                            placeholder="text file URI"
                            type="text"
                            value={uri}
                            onChange={function (event) {
                                setUri(event.target.value)
                            }}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="p-1"></td>
                    <td className="p-1">
                        <button
                            className="rounded-full border border-sky-500 hover:bg-sky-500 px-4 py-2 ml-3"
                            type="button"
                            onClick={count}
                        >
                            统计
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
