# Vue-Router

单页面应用 spa
router里面会有一个$router对象

Vue.use(VueRouter) 相等于Jquery.extend
var router = new VueRouter({
    linkActiveClass:	
    routes:[{
	meta: 源信息	
	name:home 加名称用来在 router-link里面用
        path:/路径名  *没匹配到路径名的时候触发    redirect重定向到路径  
        component：组件 components 加载多个组件的时候写 写成对象的形式
        children:[{
            子路由
        }]
    },{}...],
	mode:"hash/history" 路径后面加不加＃ 
	hash不跳转页面 history会去后台请求数据 

})

router-link 标签 属性to 加路径 属性tag：li/a 写什么就是什么标签(默认渲染a标签) active-class exact精确匹配 针对于根路由 （mode是history/hash模式时使用，不用a标签）
router-view 标签 自动注入路由 可以添加多个 但需要添加名字

transition组件 动画过度