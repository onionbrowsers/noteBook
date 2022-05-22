Array.prototype.myFlat = function (num = 1) {
    if (num <= 0 || typeof num !== 'number') return this
    if (num === Infinity) num = Number.MAX_SAFE_INTEGER
    const arr = []
    function deepFlat(targetArr, num) {
        for (let i = 0; i < targetArr.length; i++) {
            num > 0 && Array.isArray(targetArr[i]) ? deepFlat(targetArr[i], num - 1) : arr.push(targetArr[i])
        }
    }
    deepFlat(this, num)
    return arr
}
const flatArr = [1, 2, [3], [4, [5]], [6, [7, [8]]], [9, [10, [11, [12]]]]]