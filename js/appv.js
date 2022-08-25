const background = document.querySelector(".background");
const title = document.querySelector(".top-bar__text");
const pauseBtn = document.querySelector(".controls__pause");
const songAudio = document.querySelector(".progress__audio");
const songImg = document.querySelector(".song__img");
const songName = document.querySelector(".song__name");
const songArtist = document.querySelector(".song__artist");
const prev = document.querySelector(".controls__prev");
const next = document.querySelector(".controls__next");
const progressArea = document.querySelector(".progress__area");
const progressBar = document.querySelector(".progress__bar");
const repeatBtn = document.querySelector(".controls__repeat");
const shuffleBtn = document.querySelector(".controls__shuffle");
const musicList = document.querySelector(".music-list");
const showBtn = document.querySelector(".controls__more");
const hideBtn = document.querySelector("#close");
const swipeXD = document.querySelector(".swiper-wrapper");

// Número de canción
let indexSong = Math.floor(Math.random() * (allMusic.length));

// eventos
eventListeners();
function eventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
        loadMusic(indexSong);
        playingNow();
    });
    swiper.on('realIndexChange', () => {
        if (indexSong != swiper.realIndex) {
            switch (swiper.realIndex) {
                case 0:
                    indexSong = 0;
                    loadMusic(indexSong);
                    break;
            
                case 1:
                    indexSong = 1;
                    loadMusic(1);
                    break;
        
                case 2:
                    indexSong = 2;
                    loadMusic(2);
                    break;
                
                case 3:
                    indexSong = 3;
                    loadMusic(3);
                    break;
                
                case 4:
                    indexSong = 4;
                    loadMusic(4);
                    break;
        
                case 5:
                    indexSong = 5;
                    loadMusic(5);
                    break;
        
                case 6:
                    indexSong = 6;
                    loadMusic(6);
                    break;

                case 7:
                    indexSong = 7;
                    loadMusic(7);
                    break;
        
                case 8:
                    indexSong = 8;
                    loadMusic(8);
                    break;
                
                case 9:
                    indexSong = 9;
                    loadMusic(9);
                    break;
                
                case 10:
                    indexSong = 10;
                    loadMusic(10);
                    break;
        
                case 11:
                    indexSong = 11;
                    loadMusic(11);
                    break;
        
                case 12:
                    indexSong = 12;
                    loadMusic(12);
                    break;
            }
            playMusic();
            playingNow();
        }
    });
    pauseBtn.addEventListener("click", iconPause);
    prev.addEventListener("click", prevMusic);
    next.addEventListener("click", nextMusic);
    songAudio.addEventListener("timeupdate", barTime);
    progressArea.addEventListener("click", progress);
    repeatBtn.addEventListener("click", repeatToggle);
    shuffleBtn.addEventListener("click", shuffleToggle);
    songAudio.addEventListener("ended", repeatShuffle);
    showBtn.addEventListener("click", showMore);
    hideBtn.addEventListener("click", hide);
}

function playMusic() {
    title.textContent = "Reproduciendo";
    pauseBtn.children[0].textContent = "pause";
    songAudio.play();
}
function pauseMusic() {
    title.textContent = "En pausa";
    pauseBtn.children[0].textContent = "play_arrow";
    songAudio.pause();
}

function loadMusic(index) {
    songName.textContent = allMusic[index].name;
    songArtist.textContent = allMusic[index].artist;
    swiper.slideToLoop(index, 1000);
    songAudio.attributes.src.textContent = `songs/${allMusic[index].src}.mp3`;
    background.style.backgroundImage = `url(../img/${allMusic[index].src}.jpg)`;
}

// cambia el icono del boton pause
function iconPause(e) {
    e.preventDefault();
    icon = pauseBtn.children[0];
        if (icon.textContent == "play_arrow") {
            playMusic();
        } else {
            pauseMusic();
        }
        playingNow();
}

function prevMusic(e) {
    e.preventDefault();
    indexSong--;

    // si el número de la canción es menor a 0 entonces se va al total, sino se queda tal y como esta
    indexSong < 0 ? indexSong = allMusic.length - 1 : indexSong = indexSong;

    loadMusic(indexSong);
    playMusic();
    playingNow();
}

function nextMusic() {
    indexSong++;

    // si el número de la canción es mayor al total entonces vuelve a 0, sino se queda tal y como esta
    indexSong >= allMusic.length ? indexSong = 0 : indexSong = indexSong;

    loadMusic(indexSong);
    playMusic();
    playingNow();
}

// actualiza el ancho del progress bar acorde a lo que lleva la canción.
function barTime(e) {
    const currentTime = e.target.currentTime; // tiempo actual de la canción
    const duration = e.target.duration; // duración total de la canción
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = document.querySelector(".timer__current");
    let musicDuration = document.querySelector(".timer__duration");

    songAudio.addEventListener("loadeddata", () => {
        // actualiza el total de la duración de la canción
        let audioDuration = songAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) { //agregando 0 si los segundos son menos que 10
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    // actualiza el tiempo actual de la canción
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { //agregando 0 si los segundos son menos que 10
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
}

// actualiza el tiempo de la canción acorde al progress bar
function progress(e) {
    let progressWidthval = progressArea.clientWidth; // ancho del progress bar
    let clickedOffSetX = e.offsetX; //valor del offset x 
    let songDuration = songAudio.duration; // duración total

    songAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
}

// Cambia los iconos
function repeatToggle(e) {
    const shuffle = shuffleBtn.classList.contains("shuffle");
    	
    if (shuffle) {
        shuffleBtn.classList.remove("shuffle");
    }

    let icon = e.target.textContent;
    switch(icon) {
        case "repeat":
            e.target.textContent = "repeat_one";
            e.target.classList.remove("next");
            e.target.classList.add("loop");
            break;

        case "repeat_one":
            e.target.textContent = "repeat";
            e.target.classList.remove("loop");
            e.target.classList.add("next");
            break;
    }
}
function shuffleToggle(e) {
    const next = repeatBtn.classList.contains("next");
    const loop = repeatBtn.classList.contains("loop");
    if (next || loop) {
        repeatBtn.classList.remove("next");
        repeatBtn.classList.remove("loop");
    }

    if (e.target.classList.contains("shuffle")) {
        e.target.classList.remove("shuffle");
    } else {
        e.target.classList.add("shuffle");
    }
}

// repite o reproduce aleatoriamente la canción
function repeatShuffle() {
    const next = repeatBtn.classList.contains("next");
    const loop = repeatBtn.classList.contains("loop");
    const shuffle = shuffleBtn.classList.contains("shuffle");

    if (next) {
        nextMusic();
    } else if (loop) {
        // Poniendo el tiempo de la canción a 0
        songAudio.currentTime = 0;
        playMusic();
    } else if (shuffle) {
        let random = Math.floor((Math.random() * allMusic.length));
        // Este bucle se asegura que la canción no se repita
        do {
            random = Math.floor((Math.random() * allMusic.length));
        } while(indexSong == random);
        indexSong = random; 
        loadMusic(indexSong); 
        playMusic(); 
        playingNow();
    }
}


function showMore() {
    musicList.classList.toggle("show");
}
function hide() {
    showBtn.click();
}

const playList = document.querySelector(".musiclist");
// crearemos un li acorde al tamaño del array
for (let i = 0; i < allMusic.length; i++) {
    let musicTag = `
        <li li-index="${i}" class="music">
            <div class="music__header">
                <span class="music__title">${allMusic[i].name}</span>
                <p class="music__artist">${allMusic[i].artist}</p>
            </div>
            <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
            <div class="music__audio" id="${allMusic[i].src}">3:40</div>
        </li>
    `;
    playList.insertAdjacentHTML("beforeend", musicTag);

    let divAudioDuration = document.querySelector(`#${allMusic[i].src}`);
    let divAudioTag = document.querySelector(`.${allMusic[i].src}`);

    divAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = divAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        // agregando 0 si es menos que 10
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        divAudioDuration.innerText = `${totalMin}:${totalSec}`;
        // agregando t duration attribute el cual usaremos debajo
        divAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
}

// ponemos la canción que se de click

function playingNow() {
    const allLiTags = document.querySelectorAll(".music");
    for (let j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector(".music__audio");
        //removemos la clase playing de los li excepto el ultimo
        if (allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing");
            // obtenemos la duración del audio y lo pasamos a .audio-duration como texto
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration; // pasando la duración como texto
        }

        // si hay un li tag que su li-index sea igual a musicIndex entonces la canción se reproducirá
        if (allLiTags[j].getAttribute("li-index") == indexSong) {
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Escuchando";
        }
    
        //agregando onclick en todos los li tags
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

// reproducir canción que se oprima
function clicked(element) {
    // li index del tag que se dio click
    let getLiIndex = element.getAttribute("li-index");
    indexSong = getLiIndex; // pasando el liindex a musicIndex
    loadMusic(indexSong);
    playMusic();
    playingNow();
}