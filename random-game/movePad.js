function sliderMoveHandler(thumbObject, trackObject, sliderMaxValue, thumbPosition, offsetKey, sliderHandlerFoo, valueDisplayObject, valueDisplayTextFormat) {

    // Initialise objects coordinates
    let thumbOffset = Math.round((thumbObject.getBoundingClientRect().width / 2) * offsetKey);
    let sliderUnit = trackObject.getBoundingClientRect().width / sliderMaxValue;
    let thumbInitialPosition = thumbPosition.position == 0 ? 0 : (thumbPosition.position * sliderUnit) - thumbOffset;
 
    let originX = trackObject.getBoundingClientRect().x;

    let trackPosition = 0;
    let sliderMaxValueRounded = Math.round(sliderMaxValue);

    // prevent default brauser action for drag'n'drop operation
    thumbObject.ondragstart = () => false;
    thumbObject.style.transform = `translateX(${thumbInitialPosition}px)`;

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
                    thumbObject.style.transform = 'translateX(0px)';
                    trackPosition = 0;
                } else if (event.pageX > lineRightEnd) {                    
                    thumbObject.style.transform = `translateX(${trackObject.getBoundingClientRect().width}px)`
                    trackPosition = audioList[audioTrack.number].time;
                } else {
                    thumbObject.style.transform = `translateX(${event.pageX - startPosition}px)`;
                    trackPosition = (event.pageX - startPosition) / sliderUnit;
                }
                thumbPosition.position = trackPosition;
                audioTrack.currentTime = trackPosition;

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
            thumbObject.style.transform = `translateX(0px)`;
            trackPosition = 0;
        } else if (event.pageX > lineRightEnd) {
            thumbObject.style.transform = `translateX(${lineRightEnd - startPosition}px)`;
            trackPosition = audioList[audioTrack.number].time;
        } else {
            thumbObject.style.transform = `translateX(${event.pageX - startPosition + thumbOffset}px)`;
            trackPosition = (event.pageX - startPosition + thumbOffset) / sliderUnit;
        }

        if (typeof valueDisplayObject !== 'undefined') valueDisplayObject.textContent = valueDisplayTextFormat(trackPosition, sliderMaxValueRounded);
        // audioTrack.currentTime = startPlayAt.position;

        thumbPosition.position = trackPosition;
        audioTrack.currentTime = trackPosition;
    })

}
