# JS

### js初始

js执行：看一行执行一行  解释性语言  任何平台都可以用 

单线程 同一时间段只能执行一个事情  不容易出错

ECMA 欧洲计算机协会 

js执行队列 

js三大部分 ECMAscript dom bom 

引入JS方式：一，行间样式（不用） 二，内联 在body最下方写script标签  三，外联 script中的src属性 （./）

js基本语法

​	变量声明 var 

​	赋值  =

​	声明多个变量 var a,b,c,d = ‘’

**注意：**变量需以字母，$，_开头 不能用关键字，保留字

基本语法 

值类型

​	原始值 number string boolean undefined null (不可改变） 栈数据：先进去的后出来

​	引用值 [] {} function

​	基本规则：语句后面用分号结束

js语法错误会终止后续代码执行 但不会影响其他代码块

### js运算符

'+' 加法运算 正数 字符串链接（字符串相加就是链接字符串，任何数据类型加字符串都是字符串）数字最多

Infinity无限大（+1相等 ）

```js
Infinity + 1 === Infinity //true
```

'-' 减法运算 负数         * 乘法  / 除法  % 取余数 	

= 赋值  == 严格等于   === 绝对等于

优先级 （）；* / %；+ -；= 从左向右运算

a++/-- 先运算执行 后++/--

--/++a 先++/-- 后运算执行

+=/-=/*=/%= num = num + 多少

比较运算符 > ,< ,=, != 返回布尔值 比较数字和数字，数字和字符串

逻辑运算符 &&与两个都真为真，一假则假（如果两个都是真的，返回最后面的真的的值，否则返回false的值）

||或两个都假为假，一真则真  !非

undefined == null 

### 条件语句

if （判断语句）{  } else{ } else if () {  }  单独if里面不能写break，在函数或者for循环里面可以

弹出输入框函数  window.prompt();

### 循环语句

for循环 for (var i = 0; i <  ;i++ ) {  }   i = 0的时候。i< n  n等于多少执行多少次

括号里面第一个是参数，第二个是判断条件，第三个是参数++ 大括号里面是执行函数

#### while ；do while；switch case

当 while () {  } 括号里面的为true的时候执行大括号里的语句

do { } while() 不管while里面的是真是假先执行一遍再看之后的

switch (){ case 1: } 括号里填写已知情况，大括号里填写case，几种情况就写几个case 

case需要与break同时使用，否则会塌陷于下面的case，执行下面的case情况

case 后面可以写数字也可以写字符串break 可以强行打断循环，但只能终止当前循环。比如嵌套循环，哪层有break终止哪个循环

continue  略过下面的代码继续执行其他

### 浅谈对象和数组

数组 arr [] arr.length = 数组的长度

对象 obj{  }可以在里面添加属性

typeof六种类型  number string boolean object function undefined

### 显式类型转换

Number（）； 将里面的字符串转换成数字 空字符串，null，false，[]都显示0 undefined，{ }显示NaN

parseInt(string,radix) 将里面的数字转换成整数，向下取整；还可以将里面的字符串数字转换成数字

两个参数，只写一个参数的时候是取整，两个参数的时候，前一个数字是数字，后一个数字代表进制。 进制范围2-36

parseFloat(string)  可以取小数

toString(radix)	将除了undefined的所有都转换为字符串，括号里填写进制

String(mix)	转换成字符串

Boolean()	将括号里所有的都转换成布尔值

### 隐式类型转换

isNaN()； 判断括号里的内容是否是NaN ，可以将含有数字的字符串转换成数字

++/--  +/-（一元正负）+ * / %  <=  >= == != <  > 将字符串转换成数字

&& || !将所有转换成布尔值

字符串比较方式：根据字母排列顺序比较

undefined == null（特殊）

=== 和 !== 不发生隐式类型转换

### 函数

function  x() {  } 两种写法：

函数声明 function name（） {  }

函数表达式 var name = function （）{ }

小括号里面填写形参，形参可以比实参多 没有数的形参显示undefined 而实参比形参多的 多出的实参不显示

arguments 类数组 代表实参列表 

arguments[i] 改变参数内容 只有形参和实参能一一对应的时候，会有映射关系 否则不会显示，实参有多少，arguments的长度就是多少。

test.length  代表形参列表

return 交出控制权 函数里return后面的代码不执行  函数写了return后默认返回undefined 

函数内部执行调用函数为递归，详细看index里。递归缺点耗性能。（能不用就不用）

break与return的区别就是return比break更强烈break是阻止当前，而return是阻止整个函数

函数里声明的变量是局部变量，只能在函数里使用，window是全局对象

只要不用var声明的变量，为暗示全局变量。无论在函数中还是在全局中 例如： a = 10

暗示全局变量，就是给window对象加个属性   即window.a  但是如果不执行函数，在函数中暗示的全局变量无法使用 而如果外面有同样的变量，会根据先后顺序确定同一变量的大小 看例子

变量声明提升：在script标签全局中声明一个变量，会被提升在最上面即变量声明提升

函数声明提升：与上面相似，只是在变量声明提升后面 且函数声明提升将其所有包含其中的内容均提升

**注**： 如果变量和函数名一样，变量会覆盖函数

立即执行函数：（function （）{  }）（）； 此类函数没有声明，在一次执行过后即释放。

没有名字的函数叫匿名函数

函数声明不可以直接执行，但函数表达式可以执行	+/-/！function（）{  }（）；也可以作为立即执行函数

arguments.callee ： 记录调用的函数  它可以用于引用该函数的函数体内当前正在执行的函数。这在函数的名称是未知时很有用，例如在没有名称的函数表达式 (也称为“匿名函数”)内。

### 预编译

函数执行前进行

1. 创建AO对象
2. 找形参和变量声明，将变量和形参名作为AO属性名，值为undefined    
3. 将实参值和形参统一
4. 在函数体里面找函数声明，值赋予函数体

**注**：无论是否有判断还是循环，都先变量提升。

全局预编译：

1. 创建GO对象 GO里包含{window：{ }}所有的都在window里作为window的属性
2. 找变量声明，将变量作为GO属性名，值为undefined
3. 在函数体里面找函数声明，值赋予函数体

先全局在函数

### 作用域

[[scope]]是对象的属性 AO也是执行期上下文 详细看PPT 36页

AO每调用一次创建一次，使用后被销毁 

### 闭包

**当内部函数被保存到外部时，将会生成闭包。闭包会导致原有作用域链不释放，造成内存泄露。**

**就是函数里面嵌套函数，当函数在外部被保存的时候，之前创建的AO不会被销毁，只要还有连接，就不会被销毁**

### 对象

两种使用方法  

1. obj.属性；
2. obj['属性']（必须是字符串）

```js
查：obj.属性 == obj['属性']
增：obj.属性 = 值  
删：delete obj.属性
改：obj.属性 = 改变原有值
```
```js
//创建对象的方法：
var obj = {}
var obj = new Object 
```

构造函数：大驼峰写法 用函数构造，构造出来的是对象。不改变原属性  构造函数互相之间没有影响。

谁调用方法/属性 this就指向谁

构造函数内部原理：

1. 在函数体最前面隐式的加上this = {}
2. 执行 this.xxx = xxx
3. 隐式的返回this

**注意：**构造函数执行完后，函数内的this指向函数对象

```js
function student() { console.log (this) } 
var oStudent = new student()
// 这时this是student{}
```

#### 对象的枚举

for in  对象的枚举属性值需要用object[prop]不能用点（object.prop）的方式

for in 可以输出除Object.prototoype的属性外所有属性，原型链上的也可以

instanceof : 检查对象的原型链上有没有这个构造函数   如：obj instanceof Object

### 原型

原型：prototype是对象，可以用对象的写法 ，构造函数继承原型，不改变的东西写在原型上，改变的东西写在函数里

构造函数里隐式在this对象中写明__proto__实行

只有对象有原型。但万物皆对象

原型链：使原型等于构造函数 如：son.prototype = oFather 原型链的最顶端一般都是 Object。prototype  只有用Objcet.create（填对象或者填null // 填null没有原型)

null是对象，但是没有原型

### 改变this指向

call: 多个参数 （第一个参数是this指向（传什么this就是什么），后面参数是函数的参数）
apply 与call的作用相同，但参数为两个，前一个参数与call相同，后一个参数为数组，也可用arguments填写

### 命名空间

创建一个全局JS文件，创建一个全局对象，再在全局对象中创建局部对象，使用的变量全为局部对象的属性  比如：var global = {  }  global.name = { 里面的属性作为变量 }

### 运算符

逗号运算符 ，保留括号最后一个语句 

三目运算符  ？ ： （if else）

### 数组

var arr = [] 或者 arr = new Array(一个参数是数组内有几个空，多个参数才是真实值) 

方法: 

1. push() 多个参数，将其加到数组最后 返回数组添加后的长度
2. pop() 删除最后一个元素
3. shift() 删除第一个元素
4. unshift () 将元素添加到最前面
5. reserve() 将数组逆序
6. sort() 排序，默认按ASCII码排序、参数为函数

indexOf : 可返回某个指定的字符串值在字符串中首次出现的位置

### 错误信息

1. EvalError：eval()的使用与定义不一致 
2. RangeError：数值越界 
3. ReferenceError：非法或不能识别的引用数值 
4. SyntaxError：发生语法解析错误 
5. TypeError：操作数类型错误 
6. URIError：URI处理函数使用不当

es5严格模式：在script标签最上方 写上‘use strict’ 也可在某一函数内写，仅作用于该函数

不支持with,arguments.callee,func.caller,变量赋值前必须声明，局部this必须被赋

(Person.call(null/undefined) 赋值什么就是什么),拒绝重复属性和参数

### DOM

document.querySelector(".sp") 类名选择，只是此刻标签的静态快照，如果下面有同样类名的标签也无法获取

标签ID即为DOM对象	document标签即为DOM对象  js与HTML的联系为DOM 

操作类名用className

nodeType  节点类型 ：1.元素节点 2.属性节点 3.文本节点 8.注释节点 9.document 
nodeName  节点名称 

适用于查找所有的节点 

1. parentNode返回父节点（最高的父节点为document）
2. childNodes  返回所有的子节点（包括文本，注释，标签等） 返回的为数组
3. firstChild  返回第一个子节点 （同上，如果有回车，第一个节点则为文本）
4. lastChild   返回最后一个节点  （同上） 
5. nextSibling  下一个兄弟节点 （同上）
6. previousSibling  前一个兄弟节点（同上）

仅适用于元素节点的方法（元素节点即标签）

1. parentElement 返回当前元素父元素节点 没有document
2. children 返回当前元素的所有的子元素  返回的数组
3. firstElementChild  返回第一个子元素节点
4. lastElementChild 返回最后一个子元素节点
5. nextElementSibling 返回下一个兄弟元素节点	
6. previousElementSibling 返回上一个兄弟元素节点

获取属性节点的方法 ： 

1. getAttributeNode()  一个参数，参数填想要获取的属性
2. getAttribute（） 一个参数，参数填要查看的属性
3. setAttribuite() 添加属性，参数有两个，一个是要添加的属性，第二个是添加什么

任何节点本质都是对象，所以都有构造函数

如果给DOM对象添加innerHTML给其赋值，会将之前包含的内容清空

insertBefore（）父节点调用 将其中一个标签添加到另一个标签的前面 参数为两个，第一个参数是要将谁放入前面，第二个参数放在谁的前面

removeChild（） 删除节点，参数为想要删除的参数

replaceChild（）替换节点，两个参数，第一个为想要插入的标签，第二个为被替换的标签

### 日期

Date 日期函数 构造函数

var oDate = new Date()

**注：**返回的时间为该对象被创建的时间

get/set Date() 创建的日期/设置     getDay（） 创建时星期几        getMonth（） 创建时的月份  getFullYear() 创建时哪一年 

getHours() 创建的小时	getMinutes() 创建的分钟		getSeconds() 创建的秒 （get和set其余一样）

### 定时器

内部（this）指向window

setTimeout（） 用来设置延迟，一次性的，两个参数。第一个参数为函数，第二个参数为毫秒数，即过多少秒执行函数内的代码

clearTimeOut（） 清除定时器

setInterval（） 执行多次，每隔多少秒执行 参数与上面相同

clearInterval（）同上

### 一些window和document方法

window.pageXoffset 	document.body.scrollLeft	横向滚动条滚动的距离

window.pageYoffset 	document.body.scrolltop		纵向滚动条滚动的距离

window.innerWidth	获取可视区域宽度，包含滚动条

window.innerHeight

(下面方法一般不用) 

document.body.clientWidth  获取body的可视区域宽度

document.clientHeight  获取body的可视区域高度  

（常用）

document.documentElement.clientWidth  获取HTML的可视区域宽度

document.clientHeight

offsetLeft/Top/Height/Width   返回数字，实时更新，返回的是该元素距离它最近的有定位的数值，如果没有，则为到浏览器边框的地位

offsetParent  返回最近有定位的父级，没有返回body

window.scroll() 两个参数，分别对应为滚动条的横向和纵向的滚动到哪
window.scrollBy() 两个参数，在原来基础上再次滚动多少的距离	

#### 读写CSS属性的方法

dom.style.prop(只能获取行间样式)

window.getComputedStyle(element, null)[‘’] 两个参数 第一个为要获取样式的标签，第二个为要查询的伪类  中括号里填要获取的属性、

ele.currentStyle()[属性] (IE独有)  

### 事件

dom对象.on （可覆盖） this指向dom本身

addEventListener() 三个参数 第一个参数是type（比如click，mousedown等）  第二个参数为函数，执行其中的代码，第三个参数填false(true为事件捕获) （IE9以下不兼容） this指向dom本身

attachEvent （IE独有）两个参数，第一个参‘onclick’，第二个参数函数	指向window

#### 取消事件
dom.onclick != 函数（覆盖掉即可）

removeEventListener() 三个参数，第一个参数为对应的想取消的类型，第二个参数为函数，

detachEvent() 两个参数 第一个参数 （IE）

（都是点击子元素向父元素冒泡）

**事件冒泡** 从里向外冒泡  onclick/addEventlistener （第三个参数为false）

**事件捕获** 从外向里捕获  addEventlistener(第三个参数为true)

**阻止事件冒泡** ：(常用)event.stopPropagation() （IE独有）cancelBubble = true

**阻止默认事件**（比如a标签跳转）： 

+ return false 适用于on方法

+ event.preventDefault（） 适用于addEventListenner

+ event.returnValue = false （IE独有）

取消右键点击  document。onContenetMenu = function

事件源对象 event.target	可以用来做事件委托 给父级加点击事件 用target捕获

鼠标事件

先down，再up，后click

先enter 后leave

event.button 返回值为0是左键，1为中间键，2为右键

双击事件 dblclick

键盘事件  onkeydown/press/up 顺序依次  press只适用于字符按键（字母数字）

### 正则

\ 转义字符 
两种创建方式 

1. var reg = /字母/ (后面填写g.i.m 分别是全局，忽略大小写，是否算换行)
2. var reg = new RegExp()  两个参数，第一个参数放字符串，第二个参数放，gim

```js
// reg方法
let reg = new RegExp()

reg.test() // 测试返回true或false

reg.LastIndex // 下一次匹配字符的位置

reg.exec() // 检索字符串中指定的值。返回找到的值，并确定其位置。
```

```js
// string方法
let string = ''

string.search() // 找到符合正则的索引

string.match() // 匹配一个或多个正则

string.replace() // 两个参数，第一个是要替换的，第二个是被替换的（也可以穿函数）

string.split() // 一个参数，用什么方法拆分
```

子表达式：match用（\数字）代表 replace用（$数字）代表 ？：为忽略子表达式（不包括中文）

^以什么开头 $以什么结尾
[   ] 括号内任意一个即可
[^  ] 不是括号里的都可以
（a|b） a或者b都可以
. 除了空白字符都可以匹配
\w \W 单词字符/非单词字符
\d \D 数字字符/非数字字符
\b \B 单词边界/非单词边界
\s \S 空白字符/非空白字符   

（均服从贪心匹配，即能匹配多的就匹配多的）
n+最少匹配一个，有几个匹配几个，匹配最多的
n* 0个或者多个
n? 0个或一个
n{x} x填个数，填几个要几个
n{x,y} x到y个数均可
n{x,y}? 按少的匹配来
?=n 找后面必须跟着的
?!n 找后面不能跟着的

### 异步

window.onload = function （） { }    在文档执行后执行

**异步三种方式：**

1. 在script标签后面添加defer  IE能用 	domtree渲染完了执行
2. 在script标签后面添加async  主流浏览器能用   加载完了就执行
3. 自己创建:动态加载script标签，添加src属性 oScript.onload事件 readystatus

#### defer和async的区别
defer 和 async 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）

它俩的差别在于脚本下载完之后何时执行，显然 defer 是最接近我们对于应用脚本加载和执行的要求的

关于 defer，此图未尽之处在于它是按照加载顺序执行脚本的，这一点要善加利用

async 则是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行

仔细想想，async 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics

domtree 和 csstree 组成rendertree

JSON 所有对象的属性名和属性值必须用双引号包容

JSON.stringify() 把JSON对象变为字符串 	

JSON.parse() 把字符串变回对象

### BOM

+ window: alert() confirm() prompt()

+ navigator: userAgent() 返回浏览器的信息
+ history:go() forward() back()
+ location:hash #后面的东西 	

图片加载：

+ 预加载：先加载出来
+ 懒加载：需要的时候再出来

先懒加载再预加载

文档碎片：fragment document.createDocumentFragment

调BUG ：控制台  console.log() 打断点 debugger
