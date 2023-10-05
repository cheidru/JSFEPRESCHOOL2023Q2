const pad = document.getElementById('launch-pad');
const ball = document.getElementById('ball');
const playField = document.getElementById('field');

let padPosition = {};
padPosition.startX = pad.getBoundingClientRect().x;
padPosition.actualX = pad.getBoundingClientRect().x;
padPosition.endX = pad.getBoundingClientRect().x - 40 - pad.getBoundingClientRect().width;

// function dragPad() {
//     console.log('stopPropagation');

    // pad.ondragstart = () => false;
    // pad.style.transform = `translateX(${padPosition.startX}px)`;

    // Listeners to control player thumb position when it is changed manually
    pad.onpointerdown = function(event) {
    console.log('pointer down');
        // prevent selection start (browser action)
        // event.preventDefault();

        // начать отслеживание перемещения указателя и переопределить их на ползунок
        pad.setPointerCapture(event.pointerId);

        pad.onpointermove = function(event) {
            console.log('pointer move');
                let lineRightEnd = padPosition.endX;
                let startPosition = padPosition.startX;
    
                if (event.pageX < startPosition) {
                    pad.style.transform = 'translateX(0px)';
                } else if (event.pageX > lineRightEnd) {                    
                    pad.style.transform = `translateX(${lineRightEnd}px)`
                } else {
                    pad.style.transform = `translateX(${event.pageX - startPosition}px)`;
                }
        }

        pad.onpointerup = () => {
            pad.onpointermove = null;
            pad.onpointerup = null;
        }
    }
// }