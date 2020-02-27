# HTML + CSS

## 标签

1. block  块级元素：div  p  ol ul h1?h6 address table form 

2. inline	行级元素：span strong em del a b i

3. inline-block   行级块元素：img input select 

```css
	!important > 行间样式 > id > class=属性选择器=为类选择器 > 标签=伪元素 >通配符
权重:   无穷大      1000    100             10                 1         0
```

## 选择器

1. 父子选择器/派生选择器： div .demo只要包裹在div内的所有class=demo都可以

2. 直接子元素选择器 ：div>span  下面的一层

3. 并列选择器；span.demo

4. 分组选择器  span，strong代表同一级

5. 伪类选择器：
   :root 跟标签选择器 伪类选择器 权重比html标签高   
   :not([attr = value]) 除调用的以外的 否定选择器
   :empty 选择内容空的元素 空格也不可以
   ：target 适用于a标签锚点去的元素
   :first-child 选择第一个子元素
   :last-child 选择最后一个子元素
   :nth-child(num) 选择第num个子元素 还可填odd（奇数），even（偶数）
   :nth-last-child() 从后往前选

   :first-of-type 选择第一个子元素（找这种类型的第一个）
   :last-of-type  选择最后一个子元素
   :nth-of-type(num)   选择第num个子元素 还可填odd（奇数），even（偶数）
   :nth-last-of-type() 从后往前选

   :only-child  选择独生子的，唯一的，只有一个子元素
   :only-of-type   此种类的元素唯一的

   :enabled 可用的元素
   :disabled 不可用的元素
   :checkd  选中的元素
   :read-only 只读的
   :read-write 非只读的

    [attr^ = value ] 以什么value开头的属性
    [attr$ = value ] 以什么value结尾的属性
    [attr* = value] 有value就可以选中的

6. 伪元素选择器

   ::selection 改变所有被选中的文字的颜色

7. 条件选择：
   E > F 找直接子元素
   E + F 找紧挨着E的兄弟节点F，且必须在E的下面
   E ~ F 找E后面的兄弟节点

## CSS样式

font-size 字体大小    字体大小默认16px   
font-weight  字体加粗  bold bolder  lighter  100-900只有整数
font-family 字体  arial    
font-style  字体风格 italic（斜体）
color 字体颜色 1.rgb  2.#  3.英文单词
border   边框  
border-style  solid实现  dotted点状虚线    dashed线状虚线 

text-align 对齐方式 
line-height 文字占有高度   如果单行文字垂直居中（line-height=height）
text-indent  文本缩进 em=font-size
text-decoration：line-through 中划线  underline 下划线  overline 上划线 none
cursor 变鼠标样式 css88.com
vertical-align：改变文字对齐方式

## 盒模型

盒模型 padding内边距  margin外边距（不属于盒子）   border边框    内容区   总高(宽)度加上2倍的padding margin border
padding margin三种写法  1.0px 上下左右  2.0px 0px 第一个是上下  第二个左右  3.0px  0px  0px 第一个是上 第二个是左右 第三个是下  4.0px 0px 0px 0px 顺序为上右下左

**<span style='color:red'>margin塌陷：内容区与外面容器的margin-top取最大的</span>**

 **解决方法：**

1. 设置border（不可取）
2. 产生bfc元素：常用 overflow：hidden；display：inline-block
   				       不常用 position：absolute；float：left

**<span style='color:red'>margin合并：两容器margin-top取最大的 （一般不用解决 ） </span>**

 解决：产生bfc元素或其中一个容器外面套一个容器 

### flex布局

```css
弹性盒子:
/* 设置到父元素 */
display:flex 把父元素（即容器）中的子元素（及项目）都按照行级块元素排列；
flex-wrap 是否换行;
flex-direction 设置主轴;
justify-content 子元素对齐方式
align-items  给子元素定位
align-content 根据主轴
/* 设置到子元素 */
flex:flex-grow 
flex-grow: 每个元素分几份
flex-shrink 多出的部分砍掉
order 排序，数字小的排前面
align-self：center baseline flex-end flex-start 聚谁定位
```



## 层模型

1. 绝对定位  position:absolute  设置left  top  right   bottom 
   设置absolute后脱离原来位置定位，都设置absolute后在不同层没有叠加
   当有父子级时：相对于最近的有定位的父级进行定位，如果没有最近的有定位的父级，那么相对于文档进行定位		

2. 相对定位  position:relative  设置left  top  right   bottom 
   设置relative后保留原来位置进行定位	
   即使有父子级也会相对于自己原来的位置进行定位

3. 固定定位 position：fixed  （ie6没有）	设置left  top  right   bottom 
   脱离原来位置进行定位 固定在所设置的地方

## 浮动模型

浮动模型  float （文字环绕图片用float）

1. 产生浮动流 
2. 产生bfc的元素可以看到浮动元素
   position:absolute
   overflow：hidden
   float：left/right
   display：inline-block
3. 有文本属性的包括文本都能看到浮动元素
4. 清除浮动流：
   1. p标签 clear：both （不用）
   2. 伪元素 span::before/span::after  逻辑最前/逻辑最后  content：“” 内容

``` html
<!-- 清楚浮动三连套 -->
<style>
    span::after {
        content: '';
        clear: both;
        display: inline-block;
        *zoom: 1 /* 只适用于ie6，7 */
    }
</style>
```

## 动画

transform:rotate3d(X,Y,Z) 
         :rotateX/Y/Z(num deg)
         :translate(Xpx,Ypx) 可以填百分比（以自身为基准） 也可以拆分成X，Y （可用来居中）
         :scale(Xnum,Ynum) 缩放，放大或者缩小 可以设负值，反过来，及反方向放大 可拆分(用得少)
         :skew(Xdeg,Ydeg) 扭曲,拉伸
transform-origin 设置动画的中心
// 设置到父级上
transform-style：flat/preserve-3d 选择2d/3d (设置3d属性，不能设置overflow:hidden)
景深：perspective:num px;
backface-visibility:hidden; 翻面是否可见



过渡动画
transition：-property 想过渡的属性值(也可以填all，所有都执行)
            -duration 过渡的时间
            -speed 过渡的速率
            -delay 延迟多少时间执行
加逗号可写多个属性

animation : 关键帧（move） 多长时间执行完毕 速度 延迟时间 次数 运动方向（正向反向） 等
animation-play-state:paused 
@keyframes move{
    百分之几，说明时间的多少百分比
    0%{}
	100%{}
	或者
	from{}
	to{}

}

## 其他

设置position:absolute或者float：left/right的dispaly变为inline-block
a标签内不能再套a标签
p标签里面不能套div
能继承的父级属性（前提没设置的情况下）：color  font-一切


单行文字打点：  white-space：nowrap  文字到边界换行格式：不换行  （wrap换行）
 		over-flow：hidden
		text-overflow：ellipsis  溢出部分显示圆点
多行文字截断：  over-flow：hidden


主流浏览器                 opera; internet explore;  chorme         ; fire fox;   safari
主流浏览器内核           presto；    trident         webkit/blink       gecko    webkit


backgronund-image  url(地址) 背景图片
backgronund-size  背景图片大小
backgronund-position 50% 50%或者 px 或者center center 或者left top
backgronund-repeat 背景图片重复 no-repeat  repeat-y  repeat-x repeat

有网时显示图片不显示文字的办法（用backgronund-image的时候）：1. text-indent 超过容器宽度
								white-space nowarp
								overflow hidden
							     2.  padding-top ：容器高度
								 overflow hidden

padding里也能放背景图片  


控制台会先显示优先级高的选择器，可以动态改变结构

在块级元素里 margin 0 auto 代表居中

小图片   在前在后都用伪元素 当图片过小的时候不需要用jpg等后缀 
对齐线vertical-align

文字居中另一种方法 容器高度等于字体高度 外面加padding 

border-radius 复合值，上右下左 设置圆角 {
    border-left-top-radius...
}
box-shadow: x轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色 投影方式 
text-shadow: x轴偏移量 Y轴偏移量 阴影模糊半径 阴影颜色 
模糊半径不宜过大，阴影耗性能，少用

rgba 红，绿，蓝，透明度

放到背景颜色中
线性渐变(linear-gradient) (方向(角度也可以)，颜色(颜色均可以填百分比,或者像素)，颜色...)
径向渐变(radial-gradient) (形状（圆还是椭圆），颜色（），...)

word-wrap 文字换行 通常是normal

@font-face 引入字体包

border-image 边框背景 url() number stertch拉伸图片 repeat重复 round铺满

background-origin 从哪里开始引入背景图片 content-box padding-box border-box

background-size 背景图片大小 auto(默认值) cover contain 100%

媒体查询
1.引入link标签 在link标签里添加media属性
2.在css文件里填写@media  

重排重绘：回流即重新布局重排 重绘就是不影响布局改变css样式的情况
performance里面能看到
提高网页性能减少重排重绘，减少网络请求，利用CDN缓存服务器，js动态加载DOM元素，先获取长度，脱离文档流并重新插入进去，文档碎片fragment,字符串拼接代替appendTo
重排的写一起，重绘的写一起
.cssText:width:100px,height:100px; 添加css属性

