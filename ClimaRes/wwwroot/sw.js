
self.addEventListener('install', e => {
    console.log("evento Install")
});

self.addEventListener('activate', e => {
    console.log("Evento activate")
});


//Para saber todas las llamadas del cliente al servidor:
//imagenes, .css, .js, .html o llamadas asincrona
self.addEventListener('fetch', e => {
    //1. Mostrar las llamadas al servidor
    console.log(e.request.url)
});