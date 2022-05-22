# 错误问题记录

### 1. 首先仔细确定问题所在，是哪里的原因，谁的原因，产生的原因

### 2. URL不应该直接字符串拼接

例如：

```js
const baseUrl = 'https://www.baidu.com'

// 错误写法
const useUrl = baseUrl + '/dm/api'

// 正确写法
const useUrl = new Url('/dm/api', baseUrl)
```

影响范围：

1. 字符串拼接可能导致地址报错，比如多加一个斜杠 `baseUrl = 'https://www.baidu.com/'`
2. 字符串拼接不利于后续优化扩展

### 3. 所有的请求地址不应写死为测试地址

例如：

```js
// 错误写法
axios.get('https://zsys-test.zuoshouyisheng.com/dm_api/patients/').then(res => console.log(res))
```

解决办法：

**根据服务器的配置路径来获取地址，再扩展接口**

影响范围：

1. 写死的接口地址，无法区分线上线下，导致功能报错

### 4. 在不使用vue-cli开发的多文件页面的情况如何使用VUE组件开发

问题详述：**用njk开发时，需要每个页面都是独立的，所以将vue组件挂在全局VUE中，所以这时候需要动态加载组件的CSS**

```css
/* 错误写法 */
/* 在父级的css文件中import */
@import(zizuanjian.css)
```

解决办法：

**动态加载CSS**

```js
// 伪代码
let link = document.createElement('link')
link.href = url
parent.appendChild(link)
```

### 5. 团队项目多人开发

问题描述：**多人开发的情况，不能在当前最新分支开发**

```git
git clone url
当前分支：master
```

解决办法：在当前最新分支基础上创建一个新的分支去开发

```js
git clone url
git checkout -b your_branch
```

