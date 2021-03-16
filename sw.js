const staticCache = 'static-cache';
const dynamicCache = 'dynamic-cache';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/users.js',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/pages/fallback.html'
]

const limitNumCache = (cacheName, num)=>{
    caches.open(cacheName).then(cache=>{
        cache.keys().then(keys=>{
            if(keys.length>num){
                cache.delete(keys[0]).then(limitNumCache
                    (cacheName, num))
            }
        })
    })
}
// install process
self.addEventListener('install', e=>{
    e.waitUntil(
            caches.open(staticCache).then(cache=>{
            cache.addAll(assets)
    }))
})

// activate 
self.addEventListener('activate', e=>{
    console.log('activate')
})

self.addEventListener('fetch', e=>{
    
    e.respondWith(
        fetch(e.request).then(fetchRes=>{
            return caches.open(dynamicCache).then(cache=>{
                cache.put(e.request.url, fetchRes.clone());
                
                return fetchRes
            })
        }).catch(function(){
            return caches.match(e.request)
        })
    )

})  

self.addEventListener('fetch', e=>{
    
        e.respondWith(
            fetch(e.request).then(fetchRes=>{
                return caches.open(dynamicCache).then(cache=>{
                    cache.put(e.request.url, fetchRes.clone());
                    
                    return fetchRes
                })
            }).catch(function(){
                return caches.match(e.request)
            })
        )
    
})  
// self.addEventListener('fetch', e=>{
    
//         e.respondWith(
//             caches.match(e.request)
//         )
    
// })  