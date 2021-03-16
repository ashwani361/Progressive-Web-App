if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then(reg=>console.log('sw registered'))
    .catch(err => console.log('sw register err', err))
}