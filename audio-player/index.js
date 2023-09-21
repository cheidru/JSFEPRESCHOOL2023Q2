let audioFile = '';
const audioTrack = document.getElementById('mymusic');
const backwardBTN = document.getElementById('backward-btn');
const forwardBTN = document.getElementById('forward-btn');
const playBTN = document.getElementById('play-btn');
const songCover = document.getElementById('cover-img');
const sliderThumb = document.getElementById('thumb-wrapper');
const timeIndicator = document.getElementById('player-time');

let audioList = [{src: './assets/audio/beyonce.mp3', time: 3.53, img: './assets/img/lemonade.png'}, {src: './assets/audio/assets_audio_dontstartnow.mp3', time: 3.23, img: './assets/img/dontstartnow.png'}];

audioTrack.src = audioList[0].src;
console.log(audioTrack.src);

audioTrack.number = 0;


playBTN.addEventListener('click', (e) => {
    console.log('play BTM clicked');
    audioTrack.play();
})

forwardBTN.addEventListener('click', (e) => {
    changeAudio();
})

backwardBTN.addEventListener('click', (e) => {
    changeAudio();
})

function changeAudio() {
    audioTrack.number = audioTrack.number == 0 ? 1 : 0;
    audioTrack.src = audioList[audioTrack.number].src;
    songCover.src = audioList[audioTrack.number].img;

}

let playAtObject = {
}

function switchPlayPause () {

}

function readAudio() {

}

function startPlaying() {

}

function sliderFoo() {

}

function loadIMG() {

}
