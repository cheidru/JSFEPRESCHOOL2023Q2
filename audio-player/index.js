let audioFile = '';
const audioTrack = document.getElementById('mymusic');
const backwardBTN = document.getElementById('backward-btn');
const forwardBTN = document.getElementById('forward-btn');
const playBTN = document.getElementById('play-btn');
const songCover = document.getElementById('cover-img');
const sliderThumb = document.getElementById('thumb-wrapper');
const timeIndicator = document.getElementById('player-time');
const sliderTrack = document.getElementById('progress-bar-track');
const playTime = document.getElementById('player-time');
const progressBarThumb = document.getElementById('thumb-wrapper');
const progressBarLine = document.getElementById('progress-bar-track');

let audioList = [{src: './assets/audio/beyonce.mp3', time: 3.53, img: './assets/img/lemonade.png'}, {src: './assets/audio/assets_audio_dontstartnow.mp3', time: 3.23, img: './assets/img/dontstartnow.png'}];
let startPlayAt = 0;
let thumbOffset = 0;

audioTrack.src = audioList[0].src;
audioTrack.number = 0;

playBTN.addEventListener('click', () => {
    audioTrack.paused ? playLoops() : stopPlaying()
});

forwardBTN.addEventListener('click', (e) => {
    changeAudio();
})

backwardBTN.addEventListener('click', (e) => {
    changeAudio();
})

function changeAudio() {
    let startPlayAt = 0;
    audioTrack.number = audioTrack.number == 0 ? 1 : 0;
    audioTrack.src = audioList[audioTrack.number].src;
    songCover.src = audioList[audioTrack.number].img;
}

let playTimeFormat = function makePlayerTimeFormatString(trackPosition, durationRounded) {
    return `${Math.round(trackPosition)} / ${durationRounded}`;
}

function stopPlaying() {    
    audioTrack.pause();
    clearInterval(intervalsId);
    startPlayAt = audioTrack.currentTime;
    playBTN.classList.remove('pause');
    playBTN.classList.add('play');
}

sliderMoveHandler(sliderThumb, sliderTrack, audioList[audioTrack.number].time, 0, 0, undefined, timeIndicator, playTimeFormat);
// function sliderMoveHandler(thumbObject, trackObject, sliderMaxValue, thumbPosition, offsetKey, sliderHandlerFoo, valueDisplayObject, valueDisplayTextFormat)

function playLoops() {
    audioTrack.currentTime = startPlayAt;
    playBTN.classList.remove('play');
    playBTN.classList.add('pause');
    audioTrack.play();

    intervalsId = setInterval(() => {
        // display current play time on screen
        playTime.textContent = `${Math.round(audioTrack.currentTime)} / ${Math.round(audioTrack.duration)}`;
        // move progress bar Thumb according to the current play time
        let progressBarThumbPosition = audioTrack.currentTime/audioTrack.duration;
          // console.log("startPlayAt:", startPlayAt);
        if (progressBarThumbPosition < 1) {
            // progressBarThumb.style.left = (audioTrack.currentTime / (audioTrack.duration / progressBarLine.getBoundingClientRect().width)) - thumbOffset + 'px';
            progressBarThumb.style.transform = `translateX(${(audioTrack.currentTime / (audioTrack.duration / progressBarLine.getBoundingClientRect().width)) - thumbOffset}px)`;
            console.log();
        } else {
            clearInterval(intervalsId);
            playBTN.classList.remove('pause');
            playBTN.classList.add('play');

            progressBarThumb.style.left = 0 - thumbOffset + 'px';

            // progressBarThumb.style.left = thumbInitialPosition - originX + 'px';
            // startPlayAt = thumbInitialPosition * (audioTrack.duration / progressBarLine.getBoundingClientRect().width);
            startPlayAt = 0;
            playTime.textContent = `${Math.round(startPlayAt)} / ${Math.round(audioTrack.duration)}`;
        }
    }, 30);
}
