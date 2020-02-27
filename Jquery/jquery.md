# Jquery

jQuery都可以链式调用，zepto,迷你版jquery ，用于移动端

jQuery可以集体操作 即操作数组

```js
$('li').eq().css
$('.demo').css({background:'red',height:'100px'})
$('li:eq(3)')
$('li').filter(function (index) {
    return index%2 = 0
})
$('li').has('span') // 找有span的li
$('li').find('span') // 找li下的span
```

.attr() 获取属性（一个参数），设置属性（两个参数）
.prop() 同上

.next()/.prev() 上一个/下一个 兄弟节点
.index() 当前元素在兄弟中的索引

window.$ = window.jQuery = jQuery

$('.demo').click(function () {})  

.addClass() 添加类名
.removeClass() 删除类名（不传参数就删除所有类名） 

记一个
.insertBefore(dom) 调用这个方法的标签插入到参数dom标签的前面 （将调用这个方法的标签移动）
.insertAfter(dom)  调用这个方法的标签插入到参数dom标签的后面

before(dom)    调用这个方法的标签插入到参数dom标签的前面 （将调用这个方法的参数dom移动）
after(dom)     调用这个方法的标签插入到参数dom标签的后面


appendTo(dom)/prependTo(dom) 调用这个方法的标签插入到参数dom的最后面/前面 （将调用这个方法的标签移动）
append(dom)/prepend(dom)   调用这个方法的标签插入到参数dom的最后面/前面 （将调用这个方法的参数dom移动）
同种方法写两个是因为对链式调用的dom对象不同

.remove()/.detach() 删除元素，删除后会return 两者区别是detach能返回事件，而remove只返回结构

绑定事件
var arr = []
.on('click',dom,arr,function (e) {
    console.log(e.data)
}) 第二个参数填dom对象，类似于事件委托，锁定里边的dom。，第三个参数是可以获取的数据。第二，三参数可有可无

.off() 解除绑定，参数填要解除的事件类型

.html() => innerHTML
.text() => innerText
.click(function () {

})

.innerWdith() 标签的内容区加padding区
.outerWidth() 标签的内容区加padding区加border （有一个参数，如果填true，则再加上margin区域）

e.pageX 在有滚轮的情况下，相对于整个文档的宽度
e.clientX 在有滚轮的情况下，相对于浏览器可视窗口的宽度

e.witch() 返回按键的ASCII码

.one() 绑定事件，只执行一次

.offsetLeft() 相对于document的left值
.positionLeft() 相对于最近的有定位的父级

.parent() 找它的上层父级
.offsetParent() 找离他最近的有定位的父级
.parents() 找他的所有父级（一直到document）
.closest(dom) 必须传参，选择找哪个最近的父级

.each(function (idnex,ele) {}) => forEach(function (ele,index) {}) 但参数相反

.end() 返回到上一步的对象

.siblings() 返回所有兄弟节点
.prevAll() 返回该节点上面的所有兄弟节点
.nextAll() 返回该节点下面的所有兄弟节点
.prevUntil(dom) 从调用元素到dom被选中（从下往上选）
.nextUntil(dom)  (从上往下选)
.clone() 克隆，参数填true 事件也可以克隆

.wrap(dom) 给调用的元素添加父元素
.wrapinner(dom) 给调用的元素添加子元素
.wrapAll() 破环DOM结构 提取元素
.unWrap() 接触包裹

.add() 集中操作
.slice() 截取，取头不取尾

.animate({},time,speed,callback) 四个参数 首先是该DOM要变的属性值，然后是时间，然后是速度方式，最后是回掉函数
（jquery.easing.js jquery的插件 用于第三个参数，改变速度的方式）
.stop(boolean,boolean) 两个参数

.delay(time) 延迟多久执行

.trigger() 触发自己定义的事件，两个参数，第一个是要触发的事件，第二个是数组，触发函数中的参数（函数中第一个参数一般都是事件e）

$.type() 返回类型值 

$.trim() 去掉空格

$.proxy() 两个参数，改变this指向，第一个是函数，第二个是想要改到哪个对象

$.noConflict() 移交权限 防止变量冲突

$.parseJSON() 字符串转换json

$.extend() 自定义方法,$.方法 也可以合并两个对象 把其中一个对象的值复制到另一个上（浅克隆） 当第一个参数填true的时候，是深克隆
$.fn.extend() 自定义方法， $().方法

var cb = $.Callback(unique,once,memory) 返回一个回掉函数 参数均可以
cb.fire() 执行