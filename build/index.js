"use strict";
function append(key, finger, amount) {
    for (let index = 0; index < amount; index++) {
        stroke(key, finger);
    }
}
function compute(kb, text, ignoreSet, appendxx) {
    // console.log(kb)
    let layer = 0;
    const set = new Set();
    const fmm = getFingerMovementMap();
    const kdm = getKeyDistanceMap(kb);
    // console.log(kdm)
    let last = "";
    for (let index = 0; index < text.length; index++) {
        const character = text[index];
        if (ignoreSet.has(character)) {
            continue;
        }
        if (kdm.has(character)) {
            const key = kdm.get(character);
            const finger = fmm.get(key.finger);
            if (character === last) {
                if (character !== " ") {
                    finger.stroke += 1;
                }
                continue;
            }
            last = character;
            if (key.layer !== layer) {
                if (key.layer > 0) {
                    const text = kb.data.layerxx[key.layer].key;
                    const kd = kdm.get(text);
                    if (kd) {
                        const finger = fmm.get(kd.finger);
                        if (finger) {
                            stroke(kd, finger);
                        }
                    }
                }
            }
            stroke(key, finger);
            layer = key.layer;
        }
        else {
            set.add(character);
        }
    }
    appendxx.forEach((item) => {
        if (kdm.has(item.text)) {
            const amount = Math.floor(text.length / item.every);
            const key = kdm.get(item.text);
            const finger = fmm.get(key.finger);
            append(key, finger, amount);
        }
        else {
            set.add(item.text);
        }
    });
    return new Result(kb.data, fmm, set);
}
function getFingerMovementMap() {
    const map = new Map();
    map.set(Finger.thumb, new FingerMovement(Finger.thumb));
    map.set(Finger.index, new FingerMovement(Finger.index));
    map.set(Finger.middle, new FingerMovement(Finger.middle));
    map.set(Finger.ring, new FingerMovement(Finger.ring));
    map.set(Finger.little, new FingerMovement(Finger.little));
    return map;
}
function getKeyDistanceMap(kb) {
    var _a, _b;
    const map = new Map();
    kb.keyxx.forEach((key) => {
        key.textxx.forEach((item, index) => {
            if (map.has(item)) {
                const kd = map.get(item);
                if (kd.distance > key.distance) {
                    kd.distance = key.distance;
                    kd.finger = key.finger;
                    kd.layer = index;
                }
            }
            else {
                map.set(item, new KeyDistance(item, key.distance, key.finger, index));
            }
        });
    });
    const zero = new KeyDistance("", 0, Finger.thumb, 0);
    map.set("\t", (_a = map.get("Tab")) !== null && _a !== void 0 ? _a : zero);
    map.set("\n", (_b = map.get("Enter")) !== null && _b !== void 0 ? _b : zero);
    const space = map.get(" ");
    if (space) {
        space.distance = 0;
    }
    return map;
}
function stroke(key, finger) {
    finger.stroke += 1;
    finger.distance += key.distance;
    if (key.distance > 1) {
        finger.stroke2 += 1;
    }
    finger.letterSet.add(key);
}
function run(text, data1, data2, ignorexx, appendxx) {
    const ignoreSet = new Set(ignorexx);
    return new Table(compute(new KeyBoard(data1), text, ignoreSet, appendxx), compute(new KeyBoard(data2), text, ignoreSet, appendxx));
}
var Finger;
(function (Finger) {
    Finger[Finger["thumb"] = 0] = "thumb";
    Finger[Finger["index"] = 1] = "index";
    Finger[Finger["middle"] = 2] = "middle";
    Finger[Finger["ring"] = 3] = "ring";
    Finger[Finger["little"] = 4] = "little";
})(Finger || (Finger = {}));
class FingerMovement {
    constructor(finger, name = Finger[finger]) {
        this.finger = finger;
        this.name = name;
        this.stroke = 0;
        this.stroke2 = 0;
        this.distance = 0;
        this.letterSet = new Set();
    }
}
class FingerPosition {
    constructor(fingerRow, thumbRow, leftIndexFingerColumn, rightIndexFingerColumn) {
        this.fingerRow = fingerRow;
        this.thumbRow = thumbRow;
        this.leftIndexFingerColumn = leftIndexFingerColumn;
        this.rightIndexFingerColumn = rightIndexFingerColumn;
    }
    column(finger, left) {
        if (finger === Finger.thumb) {
            if (left) {
                return this.leftIndexFingerColumn + 1;
            }
            return this.rightIndexFingerColumn - 1;
        }
        const list = [Finger.index, Finger.middle, Finger.ring, Finger.little];
        const offset = list.indexOf(finger);
        if (left) {
            return this.leftIndexFingerColumn - offset;
        }
        return this.rightIndexFingerColumn + offset;
    }
    row(finger) {
        if (finger === Finger.thumb) {
            return this.thumbRow;
        }
        return this.fingerRow;
    }
}
const LayerAmount = 8;
class Key {
    constructor(column, row, width, height, distance = 1, left = true, finger = Finger.thumb) {
        this.column = column;
        this.row = row;
        this.width = width;
        this.height = height;
        this.distance = distance;
        this.finger = finger;
        this.left = left;
        this.textxx = new Array(LayerAmount).fill("");
    }
    find(text) {
        return this.textxx.find((key) => key === text);
    }
    setKey(layer, key) {
        this.textxx[layer] = key;
    }
}
class KeyBoard {
    constructor(data) {
        this.data = data;
        this.column = data.column;
        this.row = data.row;
        this.fingerRow = data.fingerRow;
        this.leftIndexFingerColumn = data.leftIndexFingerColumn;
        this.rightIndexFingerColumn = data.rightIndexFingerColumn;
        this.keyxx = new Array(data.row * data.column);
        let index = 0;
        for (let yyy = 0; yyy < data.row; yyy++) {
            for (let xxx = 0; xxx < data.column; xxx++) {
                const key = new Key(xxx, yyy, 1, 1);
                this.keyxx[index] = key;
                data.layerxx.forEach((layer, li) => {
                    key.textxx[li] = layer.rowxx[yyy][xxx];
                });
                index += 1;
            }
        }
        this.position = new FingerPosition(data.fingerRow, data.thumbRow, data.leftIndexFingerColumn, data.rightIndexFingerColumn);
        this.setLeftIndexFinger(data.fingerRow, data.leftIndexFingerColumn);
        this.setRightIndexFinger(data.fingerRow, data.rightIndexFingerColumn);
    }
    computeDistance(x1, y1, x2, y2) {
        const sum = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
        return Math.sqrt(sum);
    }
    fill(layer, row, keyxx) {
        let index = row * this.column;
        for (const key of keyxx) {
            this.keyxx[index].setKey(layer, key);
            index += 1;
        }
    }
    getLayerKey(index) {
        return this.data.layerxx[index].key;
    }
    bindKeyFinger(row, column, left, finger) {
        const index = row * this.column + column;
        const found = this.keyxx[index];
        if (found) {
            found.left = left;
            found.finger = finger;
            found.distance = this.computeDistance(column, row, this.position.column(finger, left), this.position.row(finger));
        }
    }
    setLeftIndexFinger(row, column) {
        const middle = (this.leftIndexFingerColumn + this.rightIndexFingerColumn + 1) >> 1;
        for (let yyy = 0; yyy < row + 2; yyy++) {
            for (let xxx = 0; xxx <= column - 3; xxx++) {
                this.bindKeyFinger(yyy, xxx, true, Finger.little);
            }
            this.bindKeyFinger(yyy, column - 2, true, Finger.ring);
            this.bindKeyFinger(yyy, column - 1, true, Finger.middle);
            for (let xxx = column; xxx < middle; xxx++) {
                this.bindKeyFinger(yyy, xxx, true, Finger.index);
            }
        }
        for (let yyy = row + 2; yyy < this.row; yyy++) {
            // left 2 keys
            this.bindKeyFinger(yyy, 0, true, Finger.little);
            this.bindKeyFinger(yyy, 1, true, Finger.little);
            for (let xxx = 2; xxx < middle; xxx++) {
                this.bindKeyFinger(yyy, xxx, true, Finger.thumb);
            }
        }
    }
    setRightIndexFinger(row, column) {
        const middle = (this.leftIndexFingerColumn + this.rightIndexFingerColumn + 1) >> 1;
        for (let yyy = 0; yyy < row + 2; yyy++) {
            for (let xxx = middle; xxx <= column; xxx++) {
                this.bindKeyFinger(yyy, xxx, false, Finger.index);
            }
            this.bindKeyFinger(yyy, column + 1, false, Finger.middle);
            this.bindKeyFinger(yyy, column + 2, false, Finger.ring);
            for (let xxx = column + 3; xxx < this.column; xxx++) {
                this.bindKeyFinger(yyy, xxx, false, Finger.little);
            }
        }
        for (let yyy = row + 2; yyy < this.row; yyy++) {
            // right 2 keys
            this.bindKeyFinger(yyy, this.column - 1, false, Finger.little);
            this.bindKeyFinger(yyy, this.column - 2, false, Finger.little);
            for (let xxx = middle; xxx < this.column - 2; xxx++) {
                this.bindKeyFinger(yyy, xxx, false, Finger.thumb);
            }
        }
    }
}
class KeyDistance {
    constructor(text, distance, finger, layer) {
        this.text = text;
        this.distance = distance;
        this.finger = finger;
        this.layer = layer;
    }
}
class Result {
    constructor(data, map, set) {
        this.data = data;
        this.map = map;
        this.set = set;
        let distance = 0;
        let stroke = 0;
        let stroke2 = 0;
        for (const item of map.values()) {
            distance += item.distance;
            stroke += item.stroke;
            stroke2 += item.stroke2;
        }
        this.totalDistance = distance;
        this.totalStroke = stroke;
        this.totalStroke2 = stroke2;
    }
}
class Table {
    constructor(result1, result2) {
        this.result1 = result1;
        this.result2 = result2;
        this.rowxx = [];
        this.rowxx.push(new Row("burden", "", "", "", ""));
        const fingerxx = Array.from(result1.map.keys());
        fingerxx.forEach((finger) => {
            const label = Finger[finger] + " finger";
            const stroke1 = result1.map.get(finger).stroke;
            const stroke2 = result2.map.get(finger).stroke;
            this.rowxx.push(new Row(label, ((stroke1 / result1.totalStroke) * 100).toFixed(1) + " %", ((stroke2 / result2.totalStroke) * 100).toFixed(1) + " %", "", ""));
        });
        this.rowxx.push(new Row("total", "", "", "", ""));
        this.rowxx.push(this.make("total " + LabelEnum.distance, result1.totalDistance, result2.totalDistance, true));
        this.rowxx.push(this.make("total " + LabelEnum.stroke, result1.totalStroke, result2.totalStroke));
        this.rowxx.push(this.make("total " + LabelEnum.stroke2, result1.totalStroke2, result2.totalStroke2));
        fingerxx.forEach((finger) => {
            const label = Finger[finger] + " finger";
            // console.log(label)
            // console.log(result1.map.get(finger)!.letterSet)
            // console.log(result2.map.get(finger)!.letterSet)
            this.rowxx.push(new Row(label, "", "", "", ""));
            this.rowxx.push(this.make(LabelEnum.distance, result1.map.get(finger).distance, result2.map.get(finger).distance, true));
            this.rowxx.push(this.make(LabelEnum.stroke, result1.map.get(finger).stroke, result2.map.get(finger).stroke));
            this.rowxx.push(this.make(LabelEnum.stroke2, result1.map.get(finger).stroke2, result2.map.get(finger).stroke2));
        });
    }
    make(label, value1, value2, real = false) {
        if (value1 === 0) {
            if (value2 === 0) {
                return new Row(label, "0", "0", "0", "0");
            }
            return new Row(label, "0", value2.toFixed(1), value2.toFixed(1), "+100.0 %");
        }
        const difference = value2 - value1;
        const rate = (difference / value1) * 100;
        let sign = "";
        if (difference > 0) {
            sign = "+";
        }
        if (real) {
            return new Row(label, value1.toFixed(1), value2.toFixed(1), sign + difference.toFixed(1), sign + rate.toFixed(1) + " %");
        }
        return new Row(label, value1.toString(), value2.toString(), sign + difference.toString(), sign + rate.toFixed(1) + " %");
    }
}
var LabelEnum;
(function (LabelEnum) {
    LabelEnum["distance"] = "distance";
    LabelEnum["stroke"] = "stroke";
    LabelEnum["stroke2"] = "stroke<br>(distance > 1)";
})(LabelEnum || (LabelEnum = {}));
class Row {
    constructor(label, value1, value2, value3, value4) {
        this.label = label;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }
}
