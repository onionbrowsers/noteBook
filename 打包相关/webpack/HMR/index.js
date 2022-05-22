const ws = require('ws')
const Koa = require('koa')
const chokidar = require('chokidar')
const app = new Koa()
const fs = require('fs').promises
const wss = new WebSocket.Server({ port: 8000 })
const dir = './static'
const watcher = chokidar.watch('./static', {
    ignored: /node_modules|.git/
})

wss.on('connection', ws => {
    watcher
        .on('add', path => console.log(`File ${path} added`))
        .on('change', path => console.log(`File ${path} has been changed`))
        .on('unlink', path => console.log(`File ${path} has been moved`))
        .on('all', async (event, path) => {
            if (path.endsWith('.html')) {
                body = await fs.readFile(path, {
                    encoding: 'utf-8'
                })
                const message = JSON.stringify({ type: 'html', content: body })
                ws.send(message)
            }
            // Simple Live Reload
            ws.send('reload')
        })
    let data = {}
    try {
        data = JSON.parse(event.data)
    } catch(e) {
        
    }

    if (data.type === 'html') {
        document.write(data.content)
        document.close()
        console.log('[HMR] updated HTML');
    }
    
    ws.on('message', (message) => {
        console.log('received: %s', message)
    })
    ws.send('HMR Client is Ready')
})
const injectedData = `<script>{
    const socket = new WebSocket('ws://localhost:8000');
    socket.addEventListener('open', (event) => {
        socket.send('[HMR] is Ready')
        console.log('[HMR] Start')
    });
    socket.addEventListener('message', function (event) {
        // Simple Live Reload
        if (event.data === 'reload') window.location.reload()
    })};
</script>`

app.use(async (ctx, next) => {
    let file = ctx.path
    if (ctx.path.endsWith('/')) {
        file = ctx.path + 'index.html'
    }
    let body
    try {
        body = await fs.readFile(dir + file, {
            encoding: 'utf-8'
        })
    } catch(e) {
        ctx.status = 404
        return next()
    }
    if (file.endsWith('.html')) body = body.replace('<body>', `<body>${injectedData}`)
    if (file.endsWith('.css')) ctx.type = 'text/css'
    ctx.body = body
    next()
})

app.listen(3001)
console.log('listen on port 3001')