# 深入浅出node.js

## 第一章

### 1. 进程和线程

+ 进程代表正在运行的一个程序

+ 线程代表运行程序中的一个任务，属于进程的一部分

+ 一个进程可以有多个线程

  

### 2. 单线程和多线程

- 单线程定义
  - 单线程代表一个进程中只有一个主线程
- 单线程优缺点
  - 优点
    - 不会导致进程死锁，不会有竞争资源问题
  - 缺点
    - 多核CPU利用率不高
    - 主线程的错误会导致整个应用崩溃
    - 大量计算占用CPU资源会导致无法继续调用异步I/O
- 多线程
  - 定义： 一个进程可以有多个线程，每个线程执行自己的任务
  - 优点：
    - 充分发挥CPU的能力
    - 多线程比多进程开销小
  - 缺点：
    - 线程也是程序，需要占用内存
    - 多线程需要调度和管理，需要CPU跟踪
    - 线程太多导致控制复杂
    - 会有竞争资源问题导致死锁 

### 3. IO基本理解

## 第二章 模块机制

### 1 C/S架构与B/S架构 

1. c/s架构 （client/server）
   + 定义： 客户端/服务端模式
     + 分为客户端和服务端两层
     + 用户如果使用的话，需要先下载一个客户端。像QQ，WPS软件这种。
   + 优缺点
     + 优点
       + C/S架构界面和操作很丰富
       + 安全性能容易保证（因为只有两层传输）
       + 响应速度快（直接从服务端返回）
     + 缺点
       + 适用面不高
       + 用户群固定，因为需要下载才能使用
       + 维护高
2. b/s架构 （browser/server）
   + 定义
     + 浏览器/服务器结构
   + 特点
     + 只要有浏览器即可
     + 前端逻辑少数实现
     + B/S一共分为三层
       + **第一层**：表现层 主要用来展示后台返回的数据
       + **第二层**：逻辑层 利用服务器完成客户端的应用逻辑
       + **第三层**：数据层 接收客户端的请求后独立进行运算
   + 优缺点
     + 优点
       + 无需安装，过程简单
       + 受用群体广，交互性强
       + 无需升级客户端，升级服务器即可，随时更新版本，无需重新下载
     + 缺点
       + 多浏览器兼容
       + 速度和安全性方面比C/S差很多
       + 请求响应模式需要重新刷新页面（现在有了ajax不在算是缺点内）

### 2 commonJS——希望js能在各个地方运行

1. js缺陷（commonjs实现原因，解决js无法模块化开发的痛点）
   + 没有模块系统
   + 标准库较少，仅限于浏览器端，对于I/O，文件流都没有定义
   + 没有标准接口
   + 没有专门包管理系统
2. 模块引用与导出
   + 引用方法： `require（）`
   + 导出方法： `exports` 和` module.exports`
     + 二者区别	`exports`是`module.exports`的一个属性 ，真正导出的是`module`这个对象

### 3 node模块的实现

#### 3.1 node引入模块的步骤

+ 路径分析

+ 文件定位
+ 编译执行

#### 3.2  node模块分类

+ 核心模块： node提供的原生模块

+ 用户自己定义的模块
  + 操作者自己编写的js文件
  + 第三方模块

#### 3.3 模块加载方式

+ 首先从缓存加载
+ 其次先找是否有对应的核心模块
+ 然后从用户自定义的js文件判断路径
+ 最后是从第三方模块查找
  + 第三方模块查找首先去查找`package.json`的`main`属性
  + 如果没有查看是否有`index.js`或者`index.json`或者`index.node`，如果有直接解析
  + 如果没有会去父级的`node_module`s查找，直到没有`node_modules`
  + 找不到报错 `can not find module xxx`

#### 3.4 为什么每个文件没有module，require，exports却能直接使用

​	**node在编译文件的过程中，对获取的文件进行了一层函数包装**

​	在头部添加了函数

````javascript
(function (exports, require, module, __filnname, __dirname) {
    // 最后return module(应该是)
})
````

​	包装后，使用`vm`原声模块的`runInThisContext()`执行（类似`eval`，但是有明确上下文，不会污染全局）

​	**这样既能防止全局污染，又可以将exports，require等参数暴露使用**

#### 3.5 核心模块

	>核心模块分为c/c++编写和js编写两部分，其中c/c++文件存放在node项目src文件下（现在找不到了）
	>
	> js文件存放在lib目录下 

> node项目js文件也是没有module等对象，也是经过包装一层，只是跟我们自己写的文件的区别是获取源代码方式不同（核心模块是根据标识符定位，直接去内存获取）

#### 3.6 NPM与包

1. **npm install xxx -g的意义**

   >不是安装了一个可以全局引用的包，-g的意义是将一个包安装为全局可用的执行命令，即像nodemon和node那样，可以作为命令使用，它是根据包描述文件（package.json）中的bin字段配置，将实际脚本链接到与node可执行文件相同路径

2. **npm添加镜像下载**

   ```js
   npm install xxx --registry=http://镜像url
   
   // 如果一直使用镜像下载，可以更改npm配置
   
   npm config set registry 镜像url
   ```

   

3. 使用`npm`发布一个包

   1. 首先`npm init`创建一个包描述文件，然后填写好所有的字段

   2. 创建一个文件，默认可以创建一个`index.js`文件，也可以在package文件中指定main字段

   3. 如果没有`npm`账号，输入`npm adduser`注册

   4. 如果已有账号，未登录`npm login`登陆

   5. 登陆成功后 在当前文件根目录下执行`npm publish .`

      ```js
      // 此时可能会出现几个问题
      
      code 403   **no_perms Private mode enable, only admin can publish this module:** 
      
      // 说明现在的下载地址是从淘宝镜像下载，改为npm地址
      
      npm config set registry http://registry.npmjs.org
      
      code 403  **you must verify your email before publishing a new package**
      
      // 邮箱没有激活，这时找到你邮箱中的npm inc点击链接即可
      ```

      

   6. 发布成功，可以`npm install`下载查看

#### 3.7 npm潜在问题

+ 安全问题，npm中每个人都可以提交，无法保证模块的安全问题

+ 质量问题，理由同上

  > 好的办法就是根据github项目和npm排序来确定包的质量和包的安全问题

### 4 前后端共用模块

> node.js因为是基于js写的，所以既可以在后端引用，也可以在前端引用，但对于前后端来说，模块引用侧重点不同
>
> 首先，前端因为依赖于宽带所以更注重于速度
>
> 其次，后端因为依赖于CPU和内存所以更注重于空间
>
> 这就导致了二者加载模块的方式不同

+ 后端引用模块可以仍然使用common.js规范

+ 前端引用模块如果大量同步引用会导致阻塞，速度变慢，对于前端来说是致命问题，所以

  对于前端来说，使用AMD和CMD规范相对来说更好

1. AMD规范

   ```js
   // id和依赖可选
   define(id?, dependencies?, factory)
   // 使用方式
   define(function () {
       var exports = {}
       exports.hello = function () {
           console.log('hello')
       }
       return exports
   })
   define(['dep1', 'dep2'], function (dep1, dep2) { 
    	return function () {}; 
   });
   ```

   使用`amd`规范的好处是即用即引，而且封闭作用域，不会出现变量污染的情况，但是需要手动导出模块，而且不允许动态引入，需要将所有用到的依赖事先指定好，然后传到`dependence`参数中

2. CMD规范

   CMD与AMD并没有很多的不同，唯一不同点就是可以动态引入，更加贴近于commonjs规范

   ```js
   define(function(require, exports, module) { 
    	// The module code goes here
      	// require和exports,module都作为形参传递，在需要的时候使用require加载
   });
   ```

## 第三章 异步I/O

### 1 为什么要异步I/O

> 对于一组任务的处理：可以分为两种方式
>
> 1. 单线程串行依次执行
> 2. 多线程并行执行
>
> 对于这两种执行方式都有着自己的不足
>
> 首先对于单线程串行执行，如果遇到请求资源时间过长的情况下，会阻塞后续代码执行，不利于硬件资源优化使用
>
> 其次对于多线程执行的情况下，会有线程死锁，资源竞争，切换线程开销，状态同步这些问题
>
> 所以基于此，node.js保留了js中的异步方式，并且使用和js一样的单线程方式，这样就避免了多线程的问题，在利用异步I/O的方式，避免当请求资源时间过长的情况导致阻塞的问题，而对于多核CPU单线程无法充分发挥的问题，node.js实现了web worker的方式开启子进程来发挥多核CPU性能

#### 1.1 阻塞I/O和非阻塞I/O

1. **阻塞I/O（CPU资源等待浪费）**

   阻塞I/O的原理是，当发起一个请求时，应用层会一直等待直到拿到数据后然后处理

   ![image-20191121133837953]( https://raw.githubusercontent.com/onionbrowsers/img-upset/master/image-20191121133837953.png )

2. **非阻塞I/O（CPU资源处理浪费）**

   非阻塞I/O原理是，当发起一个请求的时候，立刻将状态返回，但不会携带数据，跟阻塞I/O的区别是，非阻塞I/O不会阻塞后续代码的执行，但是是以多次请求的方式来代替，使用轮询机制，直到拿到数据为止。

   ![image-20191121134357693]( https://raw.githubusercontent.com/onionbrowsers/img-upset/master/image-20191121134357693.png )

3. 轮询（node.js事件循环中的poll阶段也在这里）

   轮询技术主要分为：

   + read 最原始的方法，就是重复调用来检查I/O状态是否为已完成

     ![image-20191121135529196]( https://raw.githubusercontent.com/onionbrowsers/img-upset/master/image-20191121135529196.png )

   + select 在read基础上改进的一种方式，通过对文件描述符上的事件状态来判断

     但是会有一个小的限制就是字符限制

     ![image-20191121135649323](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20191121135649323.png)

   + poll轮询 与select轮询不同，他是链表机制，所以没有描述符的限制，其次他能避免不必要的检查

     ![image-20191121135806683]( https://raw.githubusercontent.com/onionbrowsers/img-upset/master/image-20191121135806683.png )

   + epoll轮询 该方案是Linux下效率最高的I/O时间处理机制，在进入轮询的时候如果没有检查到I/O事件，就会进入休眠，直到事件发生再次唤醒

     ![image-20191121144341167]( https://raw.githubusercontent.com/onionbrowsers/img-upset/master/image-20191121144341167.png)

   + 理想的异步I/O轮询

     当应用发起一个非阻塞调用时，无需通过轮询方式，直接去处理其他业务，等到I/O完成后通过信号或者回调函数将数据传给应用程序执行。

   + 现在的异步I/O情况

     对于之前的情况都是基于单线程来说，所以对于现在解决异步I/O的方式是开启多线程，对于一些请求时间长的资源开启一个I/O线程去处理。利用线程池

### 2 Node的异步I/O

#### 2.1 事件循环

![image-20191125142651932]( https://raw.githubusercontent.com/onionbrowsers/img-upset/master/image-20191125142651932.png)











