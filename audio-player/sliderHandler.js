
function sliderMoveHandler(thumbObject, trackObject, sliderMaxValue, thumbPosition, offsetKey, sliderHandlerFoo, valueDisplayObject, valueDisplayTextFormat) {

    // Initialise objects coordinates
    // let thumbOffset = (thumbObject.getBoundingClientRect().width / 2) * offsetKey;
    let thumbOffset = 0;
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

function stopPlayerWhenSliderClicked(event) {
    if (!aFile.paused & event.target != playBTN) stopPlaying();
}