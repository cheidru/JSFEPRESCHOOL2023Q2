const demo = document.getElementById('see-demo');
const hand = document.getElementById('demo-hand');
const tip = document.getElementById('demo-popup');

let demoText = [];
demoText[0] = 'At first, click a color box on the color palette to paint your code circles'
demoText[1] = 'Move to the code panel to paint the code variant according to your guess. Switch to another color as you wish'
demoText[2] = 'Click "Check the match" to show result'
demoText[3] = 'If you are lost, click "Show code" to cheat the game'
demoText[4] = 'Push "ESC" button if you got sick of the game'

let targetCoordinate = [];
targetCoordinate[0] = {
    x: paletteColorBox[0].getBoundingClientRect().right,
    y: paletteColorBox[0].getBoundingClientRect().bottom,

}

let handOffset = [];
handOffset[0] = {
    x: paletteColorBox[0].getBoundingClientRect().right * 0.5,
    y: 100
}

let tipOffset = [];
tipOffset[0] = {
    x: 900,
    y: 350
}


demo.onclick = (event) => {
    // event.stopPropagation();
    intro.style.display = 'none';
    gameIni();
    powerLayer.style.display = 'flex';
    paletteColorBox[0].style.zIndex = '2';
    hand.style.display = 'block';
    
    hand.style.left = (paletteColorBox[0].getBoundingClientRect().right + 40) + 'px';
    hand.style.bottom = (paletteColorBox[0].getBoundingClientRect().bottom + 40) + 'px';
    tip.style.left = (paletteColorBox[0].getBoundingClientRect().right + 150) + 'px';
    tip.style.bottom = paletteColorBox[0].getBoundingClientRect().bottom + 'px';
    tip.textContent = demoText[0];
    tip.style.display = 'flex';

    hand.style.animationName = 'color-select1';
    hand.style.animationDuration = '1s';
    hand.style.animationFillMode = 'forwards';

    setTimeout(() => {
        paletteColorBox[0].style.border = '5px solid gold';
        hand.style.transform = 'translate(-75px, 10px)';
        hand.style.animationName = 'color-select2';
        hand.style.animationDuration = '1s';
        hand.style.animationFillMode = 'forwards';
    }, 1000);

    setTimeout(() => {
        tip.style.display = 'none';
        attempt[0].style.zIndex = '2';
        hand.style.animationName = 'color-box-select1';
        hand.style.animationDuration = '2s';
        hand.style.animationFillMode = 'forwards';
    }, 3000);

    setTimeout(() => {
        tip.style.left = (color[0].getBoundingClientRect().right + 200) + 'px';
        tip.style.bottom = (window.innerHeight - color[0].getBoundingClientRect().bottom + 200) + 'px';
        tip.textContent = demoText[1];
        tip.style.display = 'flex';
    }, 4000);




    setTimeout(() => {
        for(let i = 1; i < 4; i++) {
            setTimeout(() => {
                hand.style.left = (color[i-1].getBoundingClientRect().right - 40) + 'px';
                color[i-1].style.backgroundColor = 'white';
                hand.style.animationDuration = '2s';
                hand.style.animationFillMode = 'forwards';
                hand.style.animationName = 'color-box-select2';  
            }, 1000 * i);
         
            }
    }, 5000);

    setTimeout(() => {
        color[3].style.backgroundColor = 'white';
    }, 8500);

    // Показать руку, один цвет палитры
    // Рука перемещается к палитре и 
    // var event;
    // event = document.createEvent("HTMLEvents");
    // event.initEvent("dataavailable", true, true);
    // event.eventName = "dataavailable";
    // element.dispatchEvent(event);

    // https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events

}
