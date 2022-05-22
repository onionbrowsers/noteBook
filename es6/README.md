# es6笔记

## let和const

### 1. let和const共同特点

+ 特点

  + 不存在变量声明提升,在声明前调用报错

  + 暂时性死区 不在乎外部是否有该变量,只要在块级作用域中用let或const定义的

    就属于该块级作用域

  + 函数有默认参数时也会有暂时性死区,例如下面例子

  ```js
  function bar(x = y, y = 2) {
      return [x, y]
  }
  bar() // 报错,因为y还没有定义就被使用
  ```

  + 不允许重复声明同一个变量(所以不能在函数内部重新声明参数)

  ```js
  {
      let a = 1
      var a = 10
      // 报错, a已经被定义,不允许重复定义
  }
  ```


### 2. 块级作用域

#### 块级作用域的作用

+ 防止内部变量覆盖外部变量

```js
var test = 1
function f() {
    console.log(test)
    // 即使没有进入到判断内,变量声明仍然被提升了
    if (false) {
        var test = 2
    }
}
f() // undefined
```

+ 防止循环内部的定义的变量也会被暴露到外部,导致内存泄漏

**重点就是为大括号内的代码定义一个自己的作用域**

**<span style='color: red'>注意：</span>** ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

```js
if (true) let x = 1 // 报错
// 正确写法
if (true) {
    let x = 1
}
```

### 3.  const的一些特殊之处

+ const声明的变量必须直接赋值,而且赋值之后不允许更改

**本质**

​	const实际上保证的不是变量值不可以改变,而是保存变量的那块地址不可以改动,所以如果存储的是引用值的情况下,无法保证引用值中的变量是否改变(如果想让对象无法增删改,使用Object.freeze,在严格模式下报错)

### 4. 顶层对象和全局对象

window是顶层对象,是具有实体意义的对象

而全局变量是在最外层定义的变量,两者在没有let.const时是相等的

**在有了let和const后,顶层对象和全局对象有了自己的定义,不在相互影响**

```js
// 全局环境下
var a = 1
window.a // 1
let b = 2
window.b // undefined
```

## 变量的解构赋值

### 1. 基本用法

```js
let [a, b, c] = [1, 2, 3]
```

**如果等号右侧不是可遍历的结构就会报错**

```js
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

**可以给变量赋默认值**

```js
let [foo = 1] = [] // foo === 1
```

### 2. 对象的解构赋值

**<span style='color: red'>注意1:</span>** **对象的解构赋值不像数组那样按照次序来的,对象的属性没有次序，变量必须与属性同名，才能取到正确的值。**

```js
let {foo, bar} = {bar: 'aaa': foo: 'bbb'}
// foo === 'bbb' bar === 'aaa'
let {baz} = {foo: 'aaa', bar: 'bbb'}
// baz === undefined
```

**<span style='color: red'>注意2:</span>** **赋值的是对象的键值,而不是键名** 例如:

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined foo在此是模式,不是变量,上述例子只是对象的简写方式
```

**解构赋值可以继承自对象原型**

```js
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
foo // "bar"
```

### 3. 字符串的解构赋值

```js
const [a,b,c,d,e] = 'hello'
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
let {length : len} = 'hello';
len // 5
```

<span style='font-size: 20px;font-weight:700'>解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。转不了就报错</span>

### 4.函数参数解构赋值

```js
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3
```

**一道例题**

```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
// 输出什么
move({x: 3, y: 8});
move({x: 3});
move({});
move();
```

```js
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
// 输出什么
move({x: 3, y: 8});
move({x: 3});
move({});
move();
```

### 5.用途

1. 交换变量

```js
let x = 1
let y = 2
[x, y] = [y, x]
```

2. 函数返回多个值分配

   ```js
   function example() {
     return [1, 2, 3];
   }
   let [a, b, c] = example();
   a, b, c // 1, 2, 3
   function example() {
     return {
       foo: 1,
       bar: 2
     };
   }
   let { foo, bar } = example();
   ```

3. 函数参数赋值

   ```js
   function f([x, y, z]) {}
   f([1, 2, 3])
   x, y, z // 1, 2, 3
   ```

4. 函数参数默认值

   ```js
   // 如果第二个参数严格等于undefined情况下,所有配置都用默认值
   jQuery.ajax = function (url, {
     async = true,
     beforeSend = function () {},
     cache = true,
     complete = function () {},
     crossDomain = false,
     global = true,
     // ... more config
   } = {}) {
     // ... do stuff
   };
   ```

## 字符串的扩展

### 1. 模板字符串

```js
`
	${something}
	this is test code
	\`(如果要使用反引号, 需要转义)
`
```

**特点**

+ 它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

+ 所有的缩进都会被保留下来(不需要可以用trim方法去掉)

+ 可以引用变量, 也可以引用对象属性, 甚至可以调用函数

  ```js
  let x = 1;
  let y = 2;
  
  `${x} + ${y} = ${x + y}`
  // "1 + 2 = 3"
  
  `${x} + ${y * 2} = ${x + y * 2}`
  // "1 + 4 = 5"
  
  let obj = {x: 1, y: 2};
  `${obj.x + obj.y}`
  
  function fn() {
    return "Hello World";
  }
  
  `foo ${fn()} bar`
  ```

## 字符串的新增方法

### 1. 字符串实例方法

+ includes 

  **作用**: 查询字符串是否包含特定的字符, 返回布尔值

+ startsWith

  **作用**: 表示参数字符串是否在原字符串的头部,返回布尔值

+ endsWith

  **作用**: 表示参数字符串是否在原字符串的尾部,返回布尔值

```js
let s = 'Hello world!';

// 第二个参数,表示从什么位置开始检索
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false

// 上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
```

+ repeat

  **作用**:  将调用该方法的字符串重复n次

  **特点**: 

  1. 返回的是新字符串
  2. 如果n是小数,会向下取整
  3. 如果是负数或infinity会报错
  4. 如果传入的是非数字,会转化成数字执行

  ```js
  'x'.repeat(3) // "xxx"
  'hello'.repeat(2) // "hellohello"
  'na'.repeat(0) // ""
  'na'.repeat(2.9) // "nana"
  'na'.repeat(Infinity)
  // RangeError
  'na'.repeat(-1)
  // RangeError
  'na'.repeat(NaN) // "" NaN 等同于 0
  'na'.repeat('na') // ""
  'na'.repeat('3') // "nanana"
  'na'.repeat(true) // "na"
  'na'.repeat([]) // ""
  ```

+ padStart(padEnd)

  **作用**: 在字符串头部(尾部)补全到指定长度

  ```js
  'x'.padStart(5, 'ab') // 'ababx'
  'x'.padStart(4, 'ab') // 'abax'
  'x'.padEnd(5, 'ab') // 'xabab'
  'x'.padEnd(4, 'ab') // 'xaba'
  'abcdef'.padStart(4) // 'abcdef'
  //上面代码中，padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
  
  'abc'.padStart(10, '0123456789')
  // '0123456abc'
  // 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
  ```

  **<span style='color: red'>注意:</span>** padLeft等同于padStart,padRight等同于padEnd

+ trimStart(trimEnd)

  **作用**: 消除字符串头部(尾部)的空格(返回新的字符串)

  ```js
  const s = '  abc  ';
  
  s.trim() // "abc"
  s.trimStart() // "abc  "
  s.trimEnd() // "  abc"
  
  s // '  abc  '
  ```

## 正则的扩展

### 1. u修饰符

​		ES6 对正则表达式添加了`u`修饰符，含义为“Unicode 模式”，用来正确处理大于`\uFFFF`的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。

```js
var s = '𠮷';

/^.$/.test(s) // false
/^.$/u.test(s) // true

// 上面代码表示，如果不添加u修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。
```

### 2. y修饰符

​		`y`修饰符的作用与`g`修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，`g`修饰符只要剩余位置中存在匹配就可，而`y`修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

```js
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null

// 上面代码有两个正则表达式，一个使用g修饰符，另一个使用y修饰符。这两个正则表达式各执行了两次，第一次执行的时候，两者行为相同，剩余字符串都是_aa_a。由于g修饰没有位置要求，所以第二次执行会返回结果，而y修饰符要求匹配必须从头部开始，所以返回null。
```

### 3. 正则断言

1. 先行断言

   ```js
   /\d+(?=%)/.exec('100% of US presidents have been male')/
   // ['100']
   // “先行断言”指的是，x只有在y前面才匹配，必须写成/x(?=y)/
   // 即 匹配在百分号前的数字一个到多个
   ```

2. 先行否定断言

   ```js
   /\d+(?!%)/.exec('that’s all 44 of them') 
   // ['44']
   // “先行否定断言”指的是，x只有不在y前面才匹配，必须写成/x(?!y)/
   // 即 匹配不在百分号前面的数字一个到多个
   ```

3. es6新增 后行断言

   ```js
   /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill') 
   // ['100']
   // “后行断言”正好与“先行断言”相反，x只有在y后面才匹配，必须写成/(?<=y)x/
   // 即 匹配在$后面的数字一个到多个
   ```

4. es6新增 后行否定断言

   ```js
   /(?<!\$)\d+/.exec('it’s is worth about €90')
   // ['90']
   // “后行否定断言”则与“先行否定断言”相反，x只有不在y后面才匹配，必须写成/(?<!y)x/
   // 即 匹配不在$后面的数字一个到多个
   ```

## 数值的扩展

### 1. 二进制和八进制表示法

es6提供了二进制和八进制的新的写法,分别用0b(0B)和0o(0O)表示

```js
0b11 === 3 // true
0o77 === 63 // true 等同于077 但严格模式中无效,仍然是77
```

### 2. Number.isNaN 和 Number.isFinite

区别于全局方法`isNaN`和`isFinite`

**他们不会隐式调用Number转化为数字,只要不是数字类型一律返回false**

```js
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true
```

### 3. Number.EPSILON和Number.isSafeInteger 

`epsilon` 代表极小常量, 实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

`Number.EPSILON`可以用来设置“能够接受的误差范围”。比如，误差范围设为 2 的-50 次方（即`Number.EPSILON * Math.pow(2, 2)`），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。

```js
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
```

**`isSafeInteger()`使用跟安全整数有关**

ES6 引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示`-2**53`到`2**53`范围的上下限。

`Number.isSafeInteger()`则是用来判断一个整数是否落在这个范围之内。

```js
// 不是数字的直接返回false, 不会隐式类型转换
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

### 4. Math对象扩展

1. Math.sign

   **该方法用来判断一个数是正数,还是负数,还是0,会隐式类型转换**

   ```js
   // 返回值5种
   // 参数为正数，返回+1；
   // 参数为负数，返回-1；
   // 参数为 0，返回0；
   // 参数为-0，返回-0;
   // 其他值，返回NavN。
   Math.sign(-5) // -1
   Math.sign(5) // +1
   Math.sign(0) // +0
   Math.sign(-0) // -0
   Math.sign(NaN) // NaN
   Math.sign('')  // 0
   Math.sign(true)  // +1
   Math.sign(false)  // 0
   Math.sign(null)  // 0
   Math.sign('9')  // +1
   Math.sign('foo')  // NaN
   Math.sign()  // NaN
   Math.sign(undefined)  // NaN
   ```

2. Math.cbrt

   **该方法用来计算立方根**

   ```js
   Math.cbrt('8') // 2
   Math.cbrt('hello') // NaN
   ```

3. Math.hypot(勾股定理)

   **该方法返回所有参数的平方和的平方根。**

   ```js
   Math.hypot(3, 4);        // 5
   Math.hypot(3, 4, 5);     // 7.0710678118654755
   Math.hypot();            // 0
   Math.hypot(NaN);         // NaN
   Math.hypot(3, 4, 'foo'); // NaN
   Math.hypot(3, 4, '5');   // 7.0710678118654755
   Math.hypot(-3);          // 3
   ```

### 5. 指数运算符

```js
3 ** 2 === Math.pow(3, 2)
// 9

// 这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
// 相当于 2 ** (3 ** 2),正常的指数运算方法
2 ** 3 ** 2
// 512

let a = 1.5;
a **= 2;
// 等同于 a = a * a;
// 指数等于
```

## 函数的扩展

### 1. 参数的默认值

基本用法

```js
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
// 只有当Y严格等于undefined的时候才会使用默认方式

// 构造函数默认值
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

const p = new Point();
p // { x: 0, y: 0 }
```

**<span style='color:red'>注意1:</span>** 参数变量是默认声明的，所以不能用`let`或`const`再次声明。

**<span style='color:red'>注意2:</span>** 使用参数默认值时，函数不能有同名参数。

**<span style='color:red'>注意3:</span>** 如果默认参数是函数的返回值的话,参数是惰性求值的

```js
// 例1
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
// 例2
function foo(x, x, y = 1) {
  // ...error
}
// 例3
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
// 每次在用到的时候求值
```

### 2. 与解构赋值结合使用

```js
function test({x, y = 0}) {
    console.log(x, y)
}
test({}) // undefined, 0
test({x:3, y:5}) // 3, 5
test() // 报错

// 如果想要test()不报错, 改为以下形式
// 一次参数默认值, 一次y默认值, x,y解构赋值
function test2({x, y = 0} = {}) {
    console.log(x, y)
}
test() // undefined, 0
```

**练习**

```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

// 二者区别m1有解构赋值,m2没有 所以:
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

### 3. 函数作用域

函数参数有属于自己的作用域,等到初始化结束，这个作用域就会消失。**这种语法行为，在不设置参数默认值时，是不会出现的。**

而作用域的关系如下:

块级(函数)作用域 => 全局作用域

参数作用域 => 全局作用域

**块级作用域与参数作用域不会互相影响**

```js
var x = 1;

function f(x, y = x) {
 	let x = 3
	console.log(y);
}

f(2) // 2
f() // 1
// 如果全局变量x不存在, 直接调用f()就会报错
```

函数参数默认是函数的情况下

```js
let foo = 'outer'
function bar(func = () => foo) {
	let foo = 'inner'
    console.log(func())
}
bar() // outer
// 参数是函数的情况下,也会在参数作用域内,不会影响到参数所在函数的作用域
// 上述参数作用域没有foo,所以向上查找,调用全局的foo
// 如果没有第一行的foo,直接调用将会报错
```

**一道练习题**

```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  // {
  // 	let x
  // 	let y = function () {x = 2}
  //	y()
  //}
  console.log(x);
}

foo() // 3
x // 1

// 首先,声明x的变量为var,所以在该作用域内生成了一个新的x,不会在用于参数x(如果是let将会报错)
// 其次,执行了y函数,将参数作用域内的参数x赋值为2,可以看成上述情况,不会作用于当前作用域,也不会改变外部


// 另一种情况
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
// 这种情况唯一的不同就是,这里改变x改变的是参数,调用的也是参数x是,所以是2
```

### 4. rest参数

作用:代替传统的arguments关键字

```js
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3) // 10
```

**特点**

1. rest参数是一个数组,可以使用数组的所有方法

2. rest参数必须是最后一个参数,否则会报错

3. 函数length属性不包括rest参数

   **函数的length参数就是表明函数必传的参数有几个,所以有默认值的参数也不属于length范畴**

### 5. 箭头函数

**<span style='color:red'>注意:</span>** 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

```js
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

**如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。**

```js
let fn = () => void doesNotReturn();
```

**特点:**

1. 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

   (即箭头函数没有自己的this,使用定义时所在作用域的this)

2. 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

   (理由同上)

3. 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

4. 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

5. 不可以使用call,bind,apply等方法改变this指向

**不适用场合**

1. 定义对象的方法不能使用

   ```js
   const cat = {
     lives: 9,
     jumps: () => {
       this.lives--;
     }
   }
   // 这时this指向window, 因为对象不能构成单独的作用域
   ```

2. 需要动态`this`的时候，也不应使用箭头函数。

   ```js
   var button = document.getElementById('press');
   button.addEventListener('click', () => {
     this.classList.toggle('on');
   });
   // 上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。
   ```

### 6. 函数尾调用

尾调用（Tail Call）是函数式编程的一个重要概念，就是指某个函数的最后一步是调用另一个函数。

```js
function f(x){
  return g(x);
}
```

**不属于尾调用的情况**

```js
// 情况一
function f(x){
  // 有赋值情况
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  // 有计算情况
  return g(x) + 1;
}

// 情况三
function f(x){
  // 隐式调用return undefined,不是最后一步
  g(x);
}
```

**特点**

**尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。**

**<span style='color:red'>注意:</span>** 只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

```js
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
// 函数内部使用了外部的变量,仍然保留对外部函数的调用帧
```

### 7. 函数尾递归

函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

尾递归好处就是,永远只保留最后一个函数的调用帧,所以永远都不会爆栈

```js
// 不用尾递归的阶乘方法
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

// 尾递归优化后
function jiecheng(n, num = 1) {
    if (n === 1) return num
    return jiecheng(n - 1, num * n)
}
```

```js
// 不用尾递归的斐波那契方法
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

// 使用尾递归的斐波那契方法
function fib(n, a1 = 1, a2 = 1) {
    if (n <= 1) return a2
    return fib(n - 1, a2, a2 + a1)
}
```

ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

- `func.arguments`：返回调用时函数的参数。
- `func.caller`：返回调用当前函数的那个函数。

## 数组的扩展

### 1. 扩展运算符

```js
console.log(...[1, 2, 3])
// 1, 2, 3

// 扩展运算符与正常的函数参数可以结合使用，非常灵活。
// 形参使用...后面不能再加参数,但实参可以
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

**应用:**

1. 复制数组

   ```js
   //ES5的方法
   const arr = [1, 2]
   const arg = arr.concat() || arr.slice()
   
   // ES6的方法
   const arr = [1, 2]
   const arg = [...arr]
   const [...arg] = arr
   ```

2. 合并数组

   ```js
   const arr1 = ['a', 'b'];
   const arr2 = ['c'];
   const arr3 = ['d', 'e'];
   
   // es5的方法
   arr1.concat(arr2, arr3)
   // es6的方法
   arr1 = [...arr1, ...arr2, ...arr3]
   ```

   **<span style='color:red'>注意:</span>** 上述均是浅拷贝,如果数组中嵌套引用值, 共用同一地址

3. 配合解构赋值使用

   ```js
   // es5
   a = list[0] rest = list.slice(1)
   // es6
   [a, ...rest] = list
   
   // 但是rest变量必须放在最后一位,否则会报错
   [...rest, a] = list // 报错
   ```

4. 解析字符串

   ```js
   let str = 'abcdef'
   
   // es5
   str.splice('')
   // es6
   [...str]
   ```

5. 对实现Iterator接口的对象解析

   ```js
   let nodeList = document.querySelectorAll('div');
   let array = [...nodeList];
   
   // 给数字添加Iterator接口
   Number.prototype[Symbol.iterator] = function*() {
     let i = 0;
     let num = this.valueOf();
     while (i < num) {
       yield i++;
     }
   }
   console.log([...5]) // [0, 1, 2, 3, 4]
   // 并不是所有类数组都可以解析,对于自定义的没有Iterator接口的类数组,扩展运算符是无效的
   ```

6. Map和Set结构, Generator函数

   ```js
   let map = new Map([
     [1, 'one'],
     [2, 'two'],
     [3, 'three'],
   ]);
   
   let arr = [...map.keys()]; // [1, 2, 3]
   ```

   **因为Map和Set内部也部署了Iterator接口,所以也可以使用扩展运算符**

   ```js
   // Generator函数
   const go = function*(){
     yield 1;
     yield 2;
     yield 3;
   };
   
   [...go()] // [1, 2, 3]
   ```

### 2. Array.from和Array.of

#### (1). Array.from

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

// Array.from有三个参数 第一个是要转换的对象,第二个是数组map方法,第三个是this指向
Array.from(arrayLike, item => item.repeat(2))
// ['aa', 'bb', 'cc']
```

`Array.from`的实现

```js
Array.myFrom = function (obj, fn, _this) {
    if (!obj.length) {
        return false
    }
    let arr = Array.prototype.slice.call(obj)
    if (!fn) return arr
    return arr.map(fn, _this = null)
}
```

#### (2). Array.of

`Array.of`方法用于将一组值，转换为数组。

主要是为了弥补Array的不足

```js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

// es6 Array.of
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

`Array.of`实现

```js
function ArrayOf(){
  return [].slice.call(arguments);
}
```

### 3. copyWithIn

该函数在数组原型上,具有三个参数

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```js
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
// 从3号位开始选择要复制的内容,没有end,所以选中[4, 5]
// 复制到0号位上,推后两个
// 即[4, 5, 3, 4, 5]
```

### 4. find和findIndex

#### (1). find

该方法在数组原型上, 参数为回调函数和this指向,用于找出第一个符合条件的数组成员,如果没有符合条件的成员，则返回`undefined`

回调函数的参数与原来的数组方法相同

分别为当前值,当前索引,原数组

```js
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

#### (2). findIndex

数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。

参数相同

```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

**<span style='color:red'>注意:</span>'** 这两个函数都可以识别`NaN`

### 5. fill

该方法在数组原型上, 用来填充数组

```js
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

三个参数

第一个是填充的内容,第二个和第三个代表填充的起始位置和结束位置

```js
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

### 6. entries(), keys(), values()

es6提供的三个新的方法

分别对数组的`索引和值`, `索引`, `值`进行遍历,返回值均是一个遍历器对象

可以用for...of进行遍历

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

### 7. includes方法

该方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似

该方法具有两个参数,第一个参数为查找的值,第二个参数为查找的起始位置,如果为负值,则从末尾开始

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

### 8. flat和flatMap

#### (1). flat

`Array.prototype.flat()`用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

```js
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
```

**<span style='color:red'>注意1: </span>**flat默认只会拉平一层,如果想要多层嵌套拉平,可以给flat传参数,代表拉平的层数

```js
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

// 如果无论多少层都要拉平,参数可以传Infinity
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
```

**<span style='color:red'>注意2:  </span>**如果原数组有空位，`flat()`方法会跳过空位。

```js
[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]
```

#### (2). flatMap

`flatMap()`方法对原数组的每个成员执行一个函数（相当于执行`Array.prototype.map()`），然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组。

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

**<span style='color:red'>注意1: </span>**`flatMap()`只能展开一层数组

## 对象的扩展

### 1. 属性的简洁表示

```js
// 1.属性简写
const foo = 'bar'
const obj = {foo}

// obj {foo: 'bar'}

function f(x, y) {
    return {x, y}
}

f(1, 2) // {x: 1, y: 2}

// 2.方法简写
const obj = {
    foo,
    add(x, y) {
        return x + y
    }
}
```

### 2. 属性名表示法

```js
// 给对象添加属性可以有两种方法

obj.foo = 1
obj['foo'] = 1

// 使用字面量定义对象的话，es5只能使用属性名直接定义
// es5
let obj = {
    foo: true,
    abc: 123
}
// es6

let obj = {
    ['foo']: true,
    abc: 123
}
```

**<span style="color:red"> 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]` </span>**

```js
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

// myObject: {[object Object]: 'valueB'}
```

描述对象的`enumerable`属性，称为“可枚举性”，如果该属性为`false`，就表示某些操作会忽略当前属性。

目前，有四个操作会忽略`enumerable`为`false`的属性。

- `for...in`循环：只遍历对象自身的和继承的可枚举的属性。
- `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
- `JSON.stringify()`：只串行化对象自身的可枚举的属性。
- `Object.assign()`： 忽略`enumerable`为`false`的属性，只拷贝对象自身的可枚举的属性。

这四个操作之中，前三个是 ES5 就有的，最后一个`Object.assign()`是 ES6 新增的。其中，只有`for...in`会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。实际上，引入“可枚举”（`enumerable`）这个概念的最初目的，就是让某些属性可以规避掉`for...in`操作，不然所有内部属性和方法都会被遍历到。比如，对象原型的`toString`方法，以及数组的`length`属性，就通过“可枚举性”，从而避免被`for...in`遍历到。

**<span style="color:red"> 总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用`for...in`循环，而用`Object.keys()`代替。 </span>**

### 3. 属性遍历的方法

1. for...in

   `for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

2. Object.keys()

   `Object.keys()`返回一个数组，包括对象自身所有可枚举的属性（不含Symbol属性）的键名

3. Object.getOwnPropertyNames()

   `Object.getOwnPropertyNames()`返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包含不可枚举的属性）的键名

4. Object.getOwnPropertySymbols()

   `Object.getOwnPropertySymbols()`返回一个数组，包含对象自身的所有Symbol属性的键名

5. Reflect.ownKeys()

   Reflect.ownKeys()返回一个数组，包含对象自身所有键名，无论是Symbol还是不可枚举的

### 4. Super关键字

**super关键字用来作为指向当前对象的原型对象**

```js
const proto = {
    foo: 'hello'
}

const obj = {
    foo: 'world',
    // 一定要写成这种形式，否则无法使用super关键字，会报错
    find() {
        return super.foo
    }
}

Object.setPrototypeOf(obj, proto)
obj.find() // 'hello'
```

**<span style="color:red"> 注意，`super`关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。 </span>**

```js
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}
// 因为内部super使用的是Object.getPrototypeOf(this)
// 所以上述三种写法，没有办法获取到当前的this，导致报错
```

### 5. 对象的解构赋值

 对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。 

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

**<span style='color:red'>注意1：扩展运算符的解构赋值为浅拷贝</span>**

**<span style='color:red'>注意2：扩展运算符的解构赋值，不能复制继承自原型对象的属性。（注意是扩展运算符的解构赋值，而不是直接解构赋值）</span>**

```js
const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3
// 因为x是单纯解构赋值，而z是定义在o上而不是原型上，所以只有y解析不出来
```

### 6. 对象的扩展运算符

 对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。 

```js
let z = {
    a:1,
    b:2
}
let n = {...z}
// 数组是特殊的对象，所以也可以使用扩展运算符
let obj = {...['a', 'b', 'c']}
obj // {0: 'a', 1: 'b', 2: 'c'}
```

 如果扩展运算符后面不是对象，则会自动将其转为对象。 

```js
// 等同于 {...Object(1)}
{...1} // {}

// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}
```

**但是对于字符串不同**

```js
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
```

## 对象的新增方法

### 1. Object.is

该方法用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。 能正确判断NaN，+0和-0问题

```js
+0 === -0 // true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

### 2. Object.assign

`Object.assign`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

```js
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

// 多个参数，第一个参数是目标对象（即输出对象），后续参数都是
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

**<span style='color:red'>注意1：该方法返回的是第一个参数的改变后的值，是浅拷贝</span>**

**<span style='color:red'>注意2： 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。 </span>**

```js
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```



**<span style='color:red'>注意3：由于undefined和null无法转换为对象，所以放在第一个参数会报错，但是放在非第一个参数时，会跳过</span>**

```js
Object.assign(undefined) // 报错
Object.assign(null) // 报错

let obj = {a: 1};
Object.assign(obj, undefined) === obj // 不报错
Object.assign(obj, null) === obj // 不报错
```

**<span style="color:red">注意4： `Object.assign`拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（`enumerable: false`）。 </span>**

**<span style="color:red">注意5：  `Object.assign`可以用来处理数组，但是会把数组视为对象。  </span>**

```js
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```

**<span style="color:red">注意6：   `Object.assign`只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。   </span>**

```js
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }
```

**Object.assign的用途：**

1. 为对象添加属性

   ```js
   class Point {
       constructor(x, y) {
           Object.assign(this, {x, y})
       }
   }
   ```

2.  为对象添加方法

   ```js
   // 给对象原型添加方法
   Object.assign(obj.prototype, {
       method() {
           // ...
       }
   })
   ```

3. 合并多个对象

   ```js
   const merge = (target, ...source) => Object.assign(target, ...source)
   
   // 如果要返回一个新的对象
   const merge = (...source) => Object.assign({}, ...source)
   ```

4. 为属性制定默认值

   ```js
   const DEFAULTS = {
       method: 'get',
       header: 'content-type/json'
   }
   function ajax(options) {
       // options中的会替换掉默认对象中相同的属性
       options = Object.assign({}, DEFAULTS, options)
   }
   ```

   **<span style='color:red'> 注意: 由于存在浅拷贝的问题，`DEFAULTS`对象和`options`对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，`DEFAULTS`对象的该属性很可能不起作用。 </span>**

### 3. Object.values

 `Object.values`方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。 

```js
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
```

**<span style='color:red'> 注意1：`Object.values`会过滤属性名为 Symbol 值的属性。 </span>**

```js
Object.values({ [Symbol()]: 123, foo: 'abc' });
// ['abc']
```

###  4, Object.entries

 `Object.entries()`方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。 

```js
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

**除了返回值不一样，该方法的行为与`Object.values`基本一致。 **



**`Object.entries`方法的另一个用处是，将对象转为真正的`Map`结构。**

```js
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }
```

### 5. Object.fromEntries

 `Object.fromEntries()`方法是`Object.entries()`的逆操作，用于将一个键值对数组转为对象。 

```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
// 该方法可以将map结构转化为对象
```

**该方法的一个用处是配合`URLSearchParams`对象，将查询字符串转为对象。 **

```js
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }
```

### 6. Object.getOwnPropertyDescriptors

ES5 的`Object.getOwnPropertyDescriptor()`方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了`Object.getOwnPropertyDescriptors()`方法，返回指定对象所有自身属性（非继承属性）的描述对象。 

```js
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

**该方法的引入目的，主要是为了解决`Object.assign()`无法正确拷贝`get`属性和`set`属性的问题。 **

### 7 . Object.setPrototypeOf

 `Object.setPrototypeOf`用来设置一个对象的`prototype`对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。 

```js
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);
o // {}, prototype: null
```

### 8. Object.getPrototypeOf

 该方法与`Object.setPrototypeOf`方法配套，用于读取一个对象的原型对象。 

```js
Object.getPrototypeOf(obj);
```

 **如果参数不是对象，会被自动转为对象。**

```js
// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}

// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}

// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true

// undefined和null由于无法转换成对象所以会报错
```

## Symbol

### 1. 描述

ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六是：`undefined`、`null`、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

Symbol 值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

```js
let s = Symbol
typeof s // symbol
```

**<span style="color:red">注意：</span>`Symbol`函数前不能使用`new`命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。**

`Symbol`函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```js
let s1 = Symbol('foo')
let s2 = Symbol('bar')

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.description // 'foo'
```

**<span style="color:red">注意：</span>Symbol 值不能与其他类型的值进行运算，会报错。**

```js
let sym = Symbol('aaa')
sym + 'your symbol is' // Uncaught TypeError: Cannot convert a Symbol value to a string
```

### 2. Symbol作为属性名

```js
let mySymbol = Symbol()

// 因为Symbol是独一无二的，所以这个属性是独一无二的，不会被覆盖

// 1.
let obj = {}
obj[mySymbol] = 'test'

// 2.
obj = {
  [mySymmbol]: 'test'
}

// 3.
let obj = {}
Object.definePropoty(obj, mySymbol, {
  test: 'value'
})
```

**<span style="color: red">注意：</span>Symbol 值作为对象属性名时，不能用点运算符。**

```js
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```

### 3. 属性名的遍历

**<span style="color: red">注意：</span>Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。**

**获取Symbol属性的方法：`Object.getOwnPropertySymbols()`**

```js
const obj = {}
let a = Symbol('a')
let b = Symbol('b')
obj[a] = 'a'
obj[b] = 'b'

const objectSymbols = Object.getOwnPropertySymbols(obj)

// objectSymbols [Symbol(a), Symbol(b)]
```

**由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。**

```js
let size = Symbol('size')

class Collection {
  constructor() {
    this[size] = 0
  }
  add(item) {
    this[this[size]] = item
    this[size]++
  }
  static sizeof(instance) {
    return instance[size]
  }
}

let x = new Collection()
Collection.sizeof(x) // 0

x.add('foo')
Collection.sizeof(x) // 1
```

### 4. Symbol.for()，Symbol.keyFor()

#### (1). Symbol.for()

当需要同一个Symbol值的时候（可能多人开发，但是又功能相同的时候）`Symbol.for()`方法可以做到这一点。

```js
let s1 = Symbol('foo')
let s2 = Symbol('foo')

s1 === s2 // true
```

**`Symbol.for()`与`Symbol()`这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()`不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的`key`是否已经存在，如果不存在才会新建一个值。**

#### (2). Symbol.keyfor()

`Symbol.keyFor()`方法返回一个已登记的 Symbol 类型值的`key`。

```js
let s1 = Symbol.for('foo')
Symbol.keyfor(s1) // foo

let s2 = Symbol('foo')
Symbol.keyfor(s2) // undefined
```

### 5. 内置的Symbol值

#### (1). Symbol.hasInstance

对象的`Symbol.hasInstance`属性，指向一个内部方法。当其他对象使用`instanceof`运算符，判断是否为该对象的实例时，会调用这个方法。比如，`foo instanceof Foo`在语言内部，实际调用的是`Foo[Symbol.hasInstance](foo)`。

```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array
  }
}
[1, 2, 3] instanceof new MyClass() // true
```

#### (2). Symbol.isConcatSpreadable

对象的`Symbol.isConcatSpreadable`属性等于一个布尔值，表示该对象用于`Array.prototype.concat()`时，是否可以展开。

```js
let arr1 = ['c', 'd']
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd']
arr2[Symbol,isConcatSpreadable] = false
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c', 'd'], 'e']
```

类似数组的对象正好相反，默认不展开。它的`Symbol.isConcatSpreadable`属性设为`true`，才可以展开。

```js
// 类数组情况
let obj = {
 	0: 'c',
  1: 'd',
  length: 2
}
['a', 'b'].concat(obj , 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true
['a', 'b'].concat(obj , 'e') // ['a', 'b', 'c', 'd', 'e']
```

## Set和Map数据结构

### 1. Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set`本身是一个构造函数，用来生成 Set 数据结构。

``` js
const arr = [2, 3, 4, 5, 1, 2, 3, 5, 1, 5, 2, 4, 3]

const set = new Set(arr)

const set1 = new Set()

for (let i = 0; i < arr.length; i++) {
  set1.add(arr[i])
}

// [2, 3, 4, 5, 1]
Object.prototype.toString.call(set) // [object, Set]
```

 

