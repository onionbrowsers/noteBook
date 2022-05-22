const quickSort = function (arr) {
    if (arr.length < 1) {
        return arr
    }
    const temp = arr[0]
    const left = []
    const right = []
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < temp) {
            left.push(arr[i])
        } else if (arr[i] >= temp) {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(temp, quickSort(right))
}

const quickSort2 = function (arr) {
    const spliceArr = function (arr, left, right) {
        let index = left
        let temp = arr[right]
        for (let i = left; i < right; i++) {
            if (arr[i] > temp) continue
            [arr[i], arr[index]] = [arr[index], arr[i]]
            index++
        }
        [arr[right], arr[index]] = [arr[index], arr[right]]
        return index
    }
    const sort = function (arr, left = 0, right = arr.length - 1) {
        if (left > right) return null
        const index = spliceArr(arr, left, right)
        sort(arr, left, index - 1)
        sort(arr, index + 1, right)
    }

    sort(arr)
    return arr
}

function sort(arr) {
    const newArr = [arr[0]]
    for (let i = 1; i < arr.length; i++) {
        let j = newArr.length
        for (; j > 0; j--) {
            if (arr[i] > newArr[j - 1]) break
        }
        newArr.splice(j, 0, arr[i])
    }
    return newArr
}
console.log(sort([5, 7, 6, 3, 5, 4, 2, 1]))

console.log(quickSort2(test()))

function test(len = 50) {
    const newArr = []
    for (let i = 0; i < len; i++) {
        newArr.push((Math.random() * len) | 0)
    }
    console.log(newArr)
    return newArr
}