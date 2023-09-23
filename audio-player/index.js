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
const author = document.getElementById('author');
const title = document.getElementById('song-name');

let audioList = [
    {src: './assets/audio/beyonce.mp3',
     time: 234,
     img: './assets/img/lemonade.png', 
     author: 'Beyoncé', 
     title: 'Don’t Hurt Yourself'
    },
    {src: './assets/audio/dont_start_now.mp3', 
     time: 203, 
     img: './assets/img/dontstartnow.png', 
     author: 'Dua Lipa', 
     title: 'Don’t Start Now'
    },
    {src: './assets/audio/sixty_minute_man.mp3', 
     time: 151, 
     img: './assets/img/billy_ward_the_dominoes.jpg', 
     author: 'Billy Ward', 
     title: 'Sixty Minute Man'
    },
    {src: './assets/audio/nat-king-cole-unforgettable.mp3', 
     time: 208, 
     img: './assets/img/NatKingCole.jpg', 
     author: 'Nat King Cole', 
     title: 'Unforgettable'
    }
];

let startPlayAt = 0;
let thumbOffset = 0;

// Initialise

let intervalsId = 0;
audioTrack.number = 0;
audioTrack.src = audioList[audioTrack.number].src;
console.log('duration =', audioTrack);
author.textContent = audioList[audioTrack.number].author;
title.textContent = audioList[audioTrack.number].title;

playBTN.addEventListener('click', () => {
    audioTrack.paused ? playLoops() : stopPlaying()
});

forwardBTN.addEventListener('click', (e) => {
    changeAudio(1);
})

backwardBTN.addEventListener('click', (e) => {
    changeAudio(-1);
})

function changeAudio(number) {
    audioTrack.number = audioTrack.number + number < 0 ? 3 : audioTrack.number + number > 3 ? 0 : audioTrack.number + number;
    audioTrack.src = audioList[audioTrack.number].src;
    songCover.src = audioList[audioTrack.number].img;
    author.textContent = audioList[audioTrack.number].author;
    title.textContent = audioList[audioTrack.number].title;
    stopPlaying();
    startPlayAt = 0;
    playTime.textContent = `0 / ${audioList[audioTrack.number].time}`;
    console.log('playTime =', audioList[audioTrack.number].time, 'audioTrack =', audioTrack.duration);
    progressBarThumb.style.transform = 'translateX(0)';
    sliderMoveHandler(sliderThumb, sliderTrack, audioList[audioTrack.number].time, 0, 0, undefined, timeIndicator, playTimeFormat);
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
