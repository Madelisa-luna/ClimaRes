﻿
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
    //console.log(e.request.url)

    //2. Requiere que las llamadas al servidor las haga el service worker
    //e.respondWith(fetch(e.request.url))

    //3. Si la url es la siguiente}
    //if (e.request.url == "http://localhost:5124/css/Estilo.css") {
        //No traigas el archivo
     
        //e.respondWith(null)
   // }
    //Si no trae normal el archivo
    //else e.respondWith(fetch(e.request.url))
});