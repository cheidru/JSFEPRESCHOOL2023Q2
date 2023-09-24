let audioFile = '';
const audioTrack = document.getElementById('mymusic');
const backwardBTN = document.getElementById('backward-btn');
const forwardBTN = document.getElementById('forward-btn');
const playBTN = document.getElementById('play-btn');
const songCover = document.getElementById('cover-img');
const sliderThumb = document.getElementById('thumb-wrapper');
const timeIndicator = document.getElementById('player-time');
const playTime = document.getElementById('player-time');
const progressBarTrack = document.getElementById('scale');
const progressBarThumb = document.getElementById('thumb-wrapper');
const author = document.getElementById('author');
const title = document.getElementById('song-name');

let audioList = [
//     {src: './assets/audio/beyonce.mp3',
//     time: 234,
//     img: './assets/img/lemonade.png', 
//     author: 'Beyoncé', 
//     title: 'Don’t Hurt Yourself'
//    },
//    {src: './assets/audio/dont_start_now.mp3', 
//     time: 203, 
//     img: './assets/img/dontstartnow.png', 
//     author: 'Dua Lipa', 
//     title: 'Don’t Start Now'
//    },
    {src: './assets/audio/doris_day-tic_tic__tic.mp3',
     time: 234,
     img: './assets/img/doris_day.jpg', 
     author: 'Doris Day', 
     title: 'Tic, Tic, Tic'
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
    },
    {src: './assets/audio/uranium_fever.mp3', 
    time: 203, 
    img: './assets/img/EltonBritt.jpg', 
    author: 'Elton Britt', 
    title: 'Uranium Fever'
    }
];

// Object property can be updated from within of any function. No need to return the value
let startPlayAt = {
    position: 0
}

let thumbOffset = 0;

// Initialise

let intervalsId = 0;
audioTrack.number = 0;
audioTrack.src = audioList[audioTrack.number].src;
console.log('duration =', audioTrack);
author.textContent = audioList[audioTrack.number].author;
title.textContent = audioList[audioTrack.number].title;
let durationRounded = Math.round(audioTrack.duration);

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
    startPlayAt.position = 0;
    playTime.textContent = `0 / ${audioList[audioTrack.number].time}`;
    console.log('playTime =', audioList[audioTrack.number].time, 'audioTrack =', audioTrack.duration);
    progressBarThumb.style.transform = 'translateX(0)';
    
    sliderMoveHandler(sliderThumb, progressBarTrack, audioList[audioTrack.number].time, startPlayAt, 1, stopPlayerWhenSliderClicked, timeIndicator, playTimeFormat);
}

let playTimeFormat = function makePlayerTimeFormatString(trackPosition, durationRounded) {
    return `${Math.round(trackPosition)} / ${durationRounded}`;
}

function stopPlaying() {    
    audioTrack.pause();
    clearInterval(intervalsId);
    startPlayAt.position = audioTrack.currentTime;
    playBTN.classList.remove('pause');
    playBTN.classList.add('play');
}

// Parameters function sliderMoveHandler
//
// (thumbObject, trackObject, sliderMaxValue, 
// thumbPosition, offsetKey, sliderHandlerFoo, 
// valueDisplayObject, valueDisplayTextFormat)

sliderMoveHandler(sliderThumb, progressBarTrack, audioList[audioTrack.number].time, startPlayAt, 1, stopPlayerWhenSliderClicked, timeIndicator, playTimeFormat);

function playLoops() {
    audioTrack.currentTime = startPlayAt.position == audioTrack.duration ? 0 : startPlayAt.position;
    playBTN.classList.remove('play');
    playBTN.classList.add('pause');
    audioTrack.play();

    intervalsId = setInterval(() => {
        // display current play time on screen
        playTime.textContent = `${Math.round(audioTrack.currentTime)} / ${Math.round(audioTrack.duration)}`;
        // move progress bar Thumb according to the current play time
        let progressBarThumbPosition = audioTrack.currentTime/audioTrack.duration;

        if (progressBarThumbPosition < 1) {
            // progressBarThumb.style.left = (audioTrack.currentTime / (audioTrack.duration / progressBarTrack.getBoundingClientRect().width)) - thumbOffset + 'px';
            progressBarThumb.style.transform = `translateX(${((audioTrack.currentTime / audioTrack.duration) * progressBarTrack.getBoundingClientRect().width) - thumbOffset}px)`;
            console.log('translateX = ', (audioTrack.currentTime / audioTrack.duration) * progressBarTrack.getBoundingClientRect().width,
            "progressBarThumb.style.left =", progressBarThumb.style.left);
        } else {
            clearInterval(intervalsId);
            playBTN.classList.remove('pause');
            playBTN.classList.add('play');

            progressBarThumb.transform = 'translateX(0px)';

            // progressBarThumb.style.left = thumbInitialPosition - originX + 'px';
            // startPlayAt.position = thumbInitialPosition * (audioTrack.duration / progressBarTrack.getBoundingClientRect().width);
            startPlayAt.position = 0;
            playTime.textContent = `${Math.round(startPlayAt.position)} / ${Math.round(audioTrack.duration)}`;
        }
    }, 30);
}
