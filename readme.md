
# Better-KeyBoard

通过改变键盘布局来提升键入效率，减轻手指负担，同时降低键入错误的机率。

和标准键盘相比，键位变化很小，方便快速适应。

进一步减轻小拇指负担 [v2](readmev2.md)


## 效果

- 小拇指负担减轻了 37.7 %
- 小拇指移动距离减少了 59.3 %
- 小拇指易错键入减少了 50.1 %
- [数据来源](https://googee.github.io/Better-KeyBoard/statistic.html)
- [键盘布局预览](https://googee.github.io/Better-KeyBoard)

<table>
    <caption>
        <span>编程中各个手指负担（击键次数百分比）</span>
    </caption>
    <thead>
        <tr>
            <th></th>
            <th>普通键盘</th>
            <th>72 键盘</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>大拇指</td>
            <td>9.1 %</td>
            <td>15.2 %</td>
        </tr>
        <tr>
            <td>食指</td>
            <td>29.3 %</td>
            <td>33.7 %</td>
        </tr>
        <tr>
            <td>中指</td>
            <td>16.2 %</td>
            <td>18.4 %</td>
        </tr>
        <tr>
            <td>无名指</td>
            <td>14.4 %</td>
            <td>13.8 %</td>
        </tr>
        <tr>
            <td>小拇指</td>
            <td>31.0 %</td>
            <td>19.0 %</td>
        </tr>
        <tr>
            <td colspan="3">
使用普通键盘，<br>
小拇指负担最重，负担了 31.0% 的键入；<br>
大拇指最轻松，仅负担了 9.1 % 的键入。
            </td>
        </tr>
    </tbody>
</table>

<table>
    <caption>
        <span>小拇指击键次数和移动距离</span>
    </caption>
    <thead>
        <tr>
            <th></th>
            <th>普通键盘</th>
            <th>72 键盘</th>
            <th>变化量</th>
            <th>百分比</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>小拇指移动距离</td>
            <td>6480.9</td>
            <td>2639.5</td>
            <td>-3841.3</td>
            <td>-59.3 %</td>
        </tr>
        <tr>
            <td>小拇指击键次数</td>
            <td>5914</td>
            <td>3686</td>
            <td>-2228</td>
            <td>-37.7 %</td>
        </tr>
        <tr>
            <td>小拇指击键次数<br>（移动距离 > 1）<br>（容易出错）</td>
            <td>1993</td>
            <td>995</td>
            <td>-998</td>
            <td>-50.1 %</td>
        </tr>
        <tr>
            <td>Delete<br>Esc<br>↑↓←→</td>
            <td>移动整只手</td>
            <td>移动一个手指</td>
            <td colspan="2">未统计相应数据</td>
        </tr>
        <tr>
            <td colspan="5">
数据仅供参考。不同的语言可能有较大的统计差异。<br>
小拇指向上下左右移动一个键位，计距离为 1
            </td>
        </tr>
    </tbody>
</table>


## 布局变动：

- 移除太远的列
  - 小拇指只需负责额外一列（ 4 个键）

- 将 4 个常用键移动到键盘中央
  - 避免移动整只手

- 将 Ctrl 键交由大拇指负责
  - 减轻小拇指负担

- 增加 MO(1) 键
  - 方便输入数字及移动光标，可自定义数十个键。

- 1 个键位变化
  - 由 `[` 变为 `=`

- 缺少 3 个键
  - `| \ [ ] { }` 这六个符号可以在 1 层键入


## 注意：

- 最下面的 3 个键，需要使用较矮的键帽。
- 自定义键时，一定要添加 `Reset` 键。
