# @z-toolkit/fe-build

## Installation

```sh
$ npm i --save-dev git+ssh://git@git.zuoshouyisheng.com:frontend/toolkit/fe-build.git
```

## Usage

### www 模块

#### 项目引入

在项目的`package.json`中添加配置：

```json
{
    "scripts" : {
        "build" : "gulp build --gulpfile=node-modules/@z-toolkit/fe-build/gulpfile.js",
        "production" : "gulp production --gulpfile=node-modules/@z-toolkit/fe-build/gulpfile.js",
        "watch" : "gulp watch --gulpfile=node-modules/@z-toolkit/fe-build/gulpfile.js"
    }
}
```

#### 目录映射关系

编译执行过程会编译项目中的 `src` 目录到 `dist` 目录中，文件映射会使用如下规则：

 - `.njk`文件会被统一放置在`dist/view`目录中，保持在`src`中的路径。
 - 除`.njk`文件之外的其他文件会被打包到`dist/static`目录中，保持在`src`目录中的路径。
 - `.mjs`文件后缀会被修改为`.mjs.js`。
 - `.vue`文件后缀会被修改为`.vue.js`。
 - 如果设置`tag : true`，静态资源文件名会在后缀之前增加`tag`，每次编译生成的`tag`不同。

例如有如下目录结构：


```
src
├── base.njk
├── css
│   └── common.css
├── image
│   └── google.jpg
├── js
│   ├── import.mjs
│   ├── index.js
│   └── vue
│       └── component.vue
├── page
│   └── home
│       ├── google.jpg
│       ├── index.css
│       ├── index.js
│       └── index.njk
├── vue
│   └── index.vue
└── widget
    └── home
        ├── css
        │   └── index.css
        ├── google.jpg
        ├── home.js
        ├── home.njk
        └── index.css
```

完成构建编译之后的目录结构：

```
dist
├── static
│   ├── font
│   │   └── x.otf
│   ├── image
│   │   └── google.jpg
│   ├── js
│   │   ├── import.mjs.js
│   │   ├── index.js
│   │   └── vue
│   │       └── component.vue.js
│   ├── page
│   │   └── home
│   │       ├── google.jpg
│   │       └── index.js
│   ├── vue
│   │   └── index.vue.js
│   └── widget
│       └── home
│           ├── google.jpg
│           └── home.js
└── view
    ├── base.njk
    ├── page
    │   └── home
    │       └── index.njk
    └── widget
        └── home
            └── home.njk
```

设置 `tag : true` 时构建得到的目录结构如下：

```
dist
├── static
│   ├── font
│   │   └── x.141vzx5.otf
│   ├── image
│   │   └── google.9hpw4p.jpg
│   ├── js
│   │   ├── import.mjs.cc5nbc.js
│   │   ├── index.e0sbet.js
│   │   └── vue
│   │       └── component.vue.noj11o.js
│   ├── page
│   │   └── home
│   │       ├── google.efmrtm.jpg
│   │       └── index.1fnbxoi.js
│   ├── vue
│   │   └── index.vue.1akgq2y.js
│   └── widget
│       └── home
│           ├── google.1f2ql2u.jpg
│           └── home.1p0wqde.js
└── view
    ├── base.njk
    ├── page
    │   └── home
    │       └── index.njk
    └── widget
        └── home
            └── home.njk
```

#### 路径解析规则

在构建编译过程中，会尝试自动解析

#### 指令语法

##### @@selector

#### 命令行参数

#### 配置文件

#### API


