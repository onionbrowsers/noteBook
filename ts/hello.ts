// // enum
// enum Color {Red = 1, Green, Blue}
// let c: Color = Color.Red

// let colorName: String = Color[2]

// console.log(c, colorName)


// // 元组
// let x: [string, number]

// x = ['hello', 10]

// x[3] = 'world'

// // any
// let list: any[] = [1, 'aaa', false]

// list[4] = 'bbb'

// console.log(list[3])

// // void
// function warnUser(): void {
// 	console.log(111)
// }

// // never
// function throwErr() : never {
//     throw new Error('message');
// }

// function infinte() : never {
//     while(true) {}
// }

// // Object
// function create(o: object): any {}

// create({a: 1})
// create(null)
// create(1)
// create('a')

// // 类型断言
// let someValue: any = "this is a string";
// let strLength: number = (<string>someValue).length;
// let strLength: number = (someValue as string).length
// console.log(strLength)

// function foo() {
//     console.log(a) //undefined
//     return a
// }
// foo()
// let a

// b? 代表该对象中b不是必须的
// type C = {a: String, b?: number}
// function f({a, b} : C): void {
//     console.log(a, b)
// }
// f({a: '11'})

// // 接口
// function printLabel(lebelledObj: {label: string}) {
//     console.log(lebelledObj.label)
// }

// let myObj = {size: 10, label: "size"}
// printLabel(myObj)

// interface LabelledValue {
//     label: string
// }

// function printLabel(lebelledObj: LabelledValue) {
//     console.log(lebelledObj.label)
// }

// let myObj = {size: 10, label: "Size 10 Object"};
// printLabel(myObj);

// // 可选属性
// interface SquareConfig {
//     color?: string,
//     width?: number
// }

// function createSquare(config: SquareConfig): {color: string, area: number} {
//     let newSquare = {color: 'white', area: 100}
//     config.color && (newSquare.color = config.color)
//     config.width && (newSquare.area = config.width * config.width)
//     return newSquare
// }

// let mySquare = createSquare({color: 'black'})
// console.log(mySquare)


// // 只读属性
// interface Point {
//     readonly x: number;
//     readonly y: string
// }

// let p: Point = {x: 11, y: 'a'}
// p.y = 'c'

// // 只读数组
// let a: number[] = [0, 1, 2, 3]
// let roArr: ReadonlyArray<number> = a

// console.log(a, roArr)


// // 特殊的属性检查
// interface SquareConfig {
//     color?: string,
//     width?: number
// }

// // 解决方式，字符串索引签名
// interface SquareConfig {
//     color?: string,
//     width?: number,
//     [propName: string]: any
// }

// function createSquare(config: SquareConfig): {color: string, width: number} {
//     let newObj = {color: 'white', width: 100}
//     return newObj
// }

// let mySquare = createSquare({ width: 100, aaa: 'black' });

// // 解决方式，类型断言
// let mySquare = createSquare({ width: 100, aaa: 'black' } as SquareConfig)


// 函数类型接口
// interface SearchFunc {
//     (source: string, subStirng: string, flag: boolean): boolean
// }

// let myFunc:SearchFunc = function (str1, str2) {
//     return false
// }

// myFunc('a', 'b', false)

interface ClockConstructor{
    new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface{
    tick()
}

class clock implements ClockInterface{
    currentDate: Date
    constructor() {
        this.currentDate = new Date()
    }
    tick() {
        console.log(111)
    }
}
