const http = require('http')
// const queryStirng = require('querystring')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('<h1>shit</h1>')
    res.end('<P>111</P>')
}).listen(8080, function (err) {
    console.log(err)
    console.log('启动成功')
})