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
const lyricsBTN = document.getElementById('lyrics');
const lyricsDisplay = document.getElementById('song-text');


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
     time: 157,
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
    time: 139, 
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
author.textContent = audioList[audioTrack.number].author;
title.textContent = audioList[audioTrack.number].title;
songCover.src = audioList[audioTrack.number].img;
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

// lyricsBTN.addEventListener('dblclick', () => {
//         lyricsBTN.style.visibility = 'hidden';
//         lyricsDisplay.style.visibility = 'show';
//         lyricsDisplay.style.width = (sliderThumb.getBoundingClientRect().width + 20) + 'px';
// })

// lyricsDisplay.addEventListener('dblclick', () => {
//     lyricsBTN.style.visibility = 'show';
//     lyricsDisplay.style.visibility = 'hidden';
// })

function changeAudio(number) {
    audioTrack.number = audioTrack.number + number < 0 ? 3 : audioTrack.number + number > 3 ? 0 : audioTrack.number + number;
    audioTrack.src = audioList[audioTrack.number].src;
    songCover.src = audioList[audioTrack.number].img;
    author.textContent = audioList[audioTrack.number].author;
    title.textContent = audioList[audioTrack.number].title;
    stopPlaying();
    startPlayAt.position = 0;
    playTime.textContent = `0 / ${audioList[audioTrack.number].time}`;
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
            progressBarThumb.style.transform = `translateX(${(progressBarThumbPosition * progressBarTrack.getBoundingClientRect().width)}px)`;
        } else {
            clearInterval(intervalsId);
            playBTN.classList.remove('pause');
            playBTN.classList.add('play');
            startPlayAt.position = 0;
            progressBarThumb.style.transform = 'translateX(0px)';
            playTime.textContent = `${Math.round(startPlayAt.position)} / ${Math.round(audioTrack.duration)}`;
        }
    }, 30);
}

audioList[0].lyrics = `
Oh give me your attention
There's been a new invention
It isn't any larger than an adding machine
It's only fair to mention
Though it's a new invention
It's one that you have heard about but few have ever seen

It doesn't do division and it doesn't multiply
It doesn't want to be a bird, it doesn't try to fly
It came about because they made a big atomic bomb
The new invention's clicking and because of all its ticking
I know where the idea came from

I tic, tic, tic, why do I tic, tic?
What amazing trick, makes me tic, tic, tic
I tic, tic, tic, an electric tic
When I feel a realistic tic

You're such an attractive pick
Give me a radioactive kick
It's distracted the way you stick
But love, love makes me tic

I tic, tic, tic and my heart beats quick
How can anything go wrong?
When I'm listening to that Geiger counter song
I tic, tic all day long

I tic, tic, tic, why do I tic, tic?
What amazing trick, makes me tic-tic-tic-tic-tic
I tic, tic, tic, an electric tic
When I feel a realistic tic

Butcher and the baker tic
So does the maker of the candlesticks
Lawyers have their politics
But love, love makes them tic

So tic, tic, tic, let your heart tic, tic
How can anything go wrong?
If you're listening to that Geiger counter song
You'll tic, tic all day long

Like the butcher and baker tics
Like the candlestick maker tics
Like the doctor and the lawyer tics
Even though he's mixed up in his politics
Like the merchant and the Indian chief tic-tics
Like the poor, like the rich man tic-tic-tics
Digging a ditch man, the butter and egg man
The poor wooden leg man, the beggar and thief

All found out what its all about
When its love you can't be wrong
You better listen to that Geiger counter song
And tic tic all day long
Tic, tic-tic-tic, tic, tic, tic-tic-tic, tic, tic, tic-tic-tic
Tic`;

audioList[1].lyrics = `
Sixty-minute man
Sixty-minute man
Lookie here girls I'm telling you now
They call me "Lovin' Dan"
I rock 'em, roll 'em all night long
I'm a sixty-minute man

Yeah, yeah , yeah

If you don't believe I'm all I say
Come up and take my hand
When I let you go you'll cry "Oh yes
He's a sixty-minute man"

There'll be 15 minutes of kissing
Then you'll holler "please don't stop" (don't stop)
There'll be 15 minutes of teasing
And 15 minutes of squeezing
And 15 minutes of blowing my top

If your man ain't treating you right
Come up and see ol' Dan
I rock 'em, roll 'em all night long
I'm a sixty-minute man

Sixty-minute man
They call me Lovin' Dan
I rock 'em, roll 'em all night long
I'm a sixty-minute man`;

audioList[2].lyrics = `
Unforgettable
That's what you are
Unforgettable
Though near or far

Like a song of love that clings to me
How the thought of you does things to me
Never before has someone been more

Unforgettable
In every way
And forevermore
That's how you'll stay

That's why, darling, it's incredible
That someone so unforgettable
Thinks that I am unforgettable, too

Unforgettable
In every way
And forevermore
That's how you'll stay`;

audioList[3].lyrics = `
Well, I don't know, but I've been told
Uranium ore's worth more than gold
Sold my Cad', I bought me a Jeep
I've got that bug and I can't sleep

Uranium fever has done and got me down
Uranium fever, it's spreadin' all around
With a Geiger counter in my hand
I'm a-goin' out to stake me some government land
Uranium fever has done and got me down

Well I had talk with the AEC
And they brought out some maps that looked good to me
And one showed me a spot that he said he knowed
So I straddled my Jeep and headed down the road

I reckon I drove about 100 miles
Down a bumpy road out through the wilds
When all of sudden I bounced to a stop
At the foot of a mountain, didn't have no top

Uranium fever has done and got me down
Uranium fever it's spreadin' all around
With a Geiger counter in my hand
I'm a-goin' out to stake me some government land
Uranium fever has done and got me down`;