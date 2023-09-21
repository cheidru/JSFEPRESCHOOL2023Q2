let audioFile = '';
const audioTrack = document.getElementById('mymusic');
const backwardBTN = document.getElementById('backward-btn');
const forwardBTN = document.getElementById('forward-btn');
const playBTN = document.getElementById('play-btn');
const songCover = document.getElementById('cover-img');
const sliderThumb = document.getElementById('thumb-wrapper');
const timeIndicator = document.getElementById('player-time');
const sliderTrack = document.getElementById('progress-bar-track');

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

function switchPlayPause () {

}

let playTimeFormat = function makePlayerTimeFormatString(trackPosition, durationRounded) {
    return `${Math.round(trackPosition)} / ${durationRounded}`;
}


sliderMoveHandler(sliderThumb, sliderTrack, audioList[audioTrack.number].time, 0, undefined, timeIndicator, playTimeFormat);


function sliderMoveHandler(thumbObject, trackObject, sliderMaxValue, thumbPosition, offsetKey, sliderHandlerFoo, valueDisplayObject, valueDisplayTextFormat) {

    // Initialise objects coordinates
    let thumbOffset = (thumbObject.getBoundingClientRect().width / 2) * offsetKey;
    let sliderUnit = trackObject.getBoundingClientRect().width / sliderMaxValue;
    let thumbInitialPosition = thumbPosition.position == 0 ? 0 - thumbOffset : (thumbPosition.position * sliderUnit) - thumbOffset;
 
    let originX = trackObject.getBoundingClientRect().x;
    console.log("sliderUnit: ", sliderUnit);

    let trackPosition = 0;
    let sliderMaxValueRounded = Math.round(sliderMaxValue);

    // prevent default brauser action for drag'n'drop operation
    thumbObject.ondragstart = () => false;
    thumbObject.style.left = thumbInitialPosition + 'px';

    // Listeners to control player thumb position when it is changed manually
    thumbObject.onpointerdown = function(event) {

        // prevent selection start (browser action)
        // event.preventDefault();

        // начать отслеживание перемещения указателя и переопределить их на ползунок
        thumbObject.setPointerCapture(event.pointerId);

        thumbObject.onpointermove = function(event) {

                // if pointer movement should initiate other actions, anable the provided function
                if (typeof sliderHandlerFoo !== 'undefined') sliderHandlerFoo(event);

                let lineRightEnd = trackObject.getBoundingClientRect().right;
                let startPosition = originX;
    
                if (event.pageX < startPosition) {
                    thumbObject.style.left = 0 - thumbOffset + 'px';
                    trackPosition = 0;
                } else if (event.pageX > lineRightEnd) {
                    // console.log("event.pageX, startPosition, lineRightEnd", event.pageX, startPosition, lineRightEnd);
                    thumbObject.style.left = lineRightEnd - startPosition - thumbOffset  + 'px';
                    trackPosition = durationRounded;
                } else {
                    thumbObject.style.left = event.pageX - startPosition - thumbOffset + 'px';
                    trackPosition = (event.pageX - startPosition) / sliderUnit;
                }
                thumbPosition.position = trackPosition;
                if (typeof valueDisplayObject !== 'undefined') valueDisplayObject.textContent = valueDisplayTextFormat(trackPosition, sliderMaxValueRounded);
        }

        thumbObject.onpointerup = () => {
            thumbObject.onpointermove = null;
            thumbObject.onpointerup = null;
        }

    }   
    
    trackObject.addEventListener('pointerdown', function(event) {
        // if pointer movement should initiate other actions, anable the provided function
        if (typeof sliderHandlerFoo !== 'undefined') sliderHandlerFoo(event);

        let lineRightEnd = trackObject.getBoundingClientRect().right;
        let startPosition = originX;

        if (event.pageX < startPosition) {
            thumbObject.style.left = originX - thumbOffset + 'px';
            trackPosition = 0;
        } else if (event.pageX > lineRightEnd) {
            thumbObject.style.left = lineRightEnd - startPosition  + 'px';
            trackPosition = durationRounded;
        } else {
            thumbObject.style.left = event.pageX - startPosition - thumbOffset + 'px';
            trackPosition = (event.pageX - startPosition) / sliderUnit;
        }
        // console.log("event.pageX, startPosition, originX, lineRightEnd", event.pageX, startPosition, originX, lineRightEnd);
        if (typeof valueDisplayObject !== 'undefined') valueDisplayObject.textContent = valueDisplayTextFormat(trackPosition, sliderMaxValueRounded);
        // aFile.currentTime = startPlayAt;
        thumbPosition.position = trackPosition;
    })

}
