const cacheStroageKey = 'minimal-pwa-2'

const cacheList = [
    // '/'
    'index.html',
    'main.css',
    'e.jpg'
]

self.addEventListener('install', e => {
    console.log(e)
    e.waitUntil(
        caches.open(cacheStroageKey)
            .then(cache => cache.addAll(cacheList))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('fetch', e => {
    console.log(e, 'e')
    console.log(caches, 'caches')
    e.respondWith(
        caches.match(e.request).then(response => {
            console.log(response, 'reponse')
            if (response) return response
            return fetch(e.request.url)
        })
    )
})

self.addEventListener('activate', e => {
    console.log(caches.keys(), '1')
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== cacheStroageKey) return caches.delete(key)
            }))
        })
    )
    return self.clients.claim();
})
