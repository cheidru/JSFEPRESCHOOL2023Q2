const pad = document.getElementById('launch-pad');
const ball = document.getElementById('ball');
let padStyle = getComputedStyle(pad);
let pasOriginX = padStyle.left;


pad.addEventListener('pointerdown', (e) => {
    dragPad(e)
})

function dragPad(event) {
    event.stopPropagation();    
    padStyle.cursor = "none";
    padStyle.left = (parseInt(pasOriginX) + 30) + 'px';
}