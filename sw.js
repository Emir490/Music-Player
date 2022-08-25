// Cuando se instala el service worker
self.addEventListener('install', e => {
    console.log("Instalado el Service Worker");
})

// Activar el Service Worker
self.addEventListener('activate', e => {
    console.log("Service Worker Activado");

    console.log(e);
})

// Evento fetch para descargar archivos estatico
self.addEventListener('fetch', e => {
    console.log("Fetch... ", e);
})