if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then( registrado => console.log("Se intalo correctamente...", registrado))
        .catch(error => console.log("Falló la instalación...", error));
} else {
    console.log("Service Workers no soportados");
}