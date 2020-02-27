# JSONP

同源策略 端口 域名 协议相同

解决跨域的7种方法

1.flash
2.服务器代理中转
3.jsonp
4.document.domain
5.window.name
6.location.hash
7.h5中的POSTMessage

script标签不只是添加js文件，可以添加其他文件 (src属性)

后台文件都是将数据封装到 函数中 ，然后前端用函数中的参数data接收
前后端函数名的统一 在src标签里在文件名后面 写 ?cb=函数名

有src属性的标签都可以跨域 （img,iframe,script）
数据用JSON的格式是因为，前端可以容易处理