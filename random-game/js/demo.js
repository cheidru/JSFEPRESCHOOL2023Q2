const demo = document.getElementById('see-demo');
const hand = document.getElementById('demo-hand');
const tip = document.getElementById('demo-popup');

let demoText = [];
demoText[0] = 'At first, click a color box on the color palette to paint your code circles'
demoText[1] = 'Move to the code panel to paint the code variant according to your guess. Switch to another color as you wish'
demoText[2] = 'Click "Check the match" to show result'
demoText[3] = 'If you are lost, click "Show code" to cheat the game'
demoText[4] = 'Push "ESC" button if you got sick of the game'

let demoKeyFrame = [];
demoKeyFrame[0] = `
    @keyframes color-select {
    from {}
    80% {transform: translateX(-75px);}
    to {transform: translateY(5px);}
  }`



demo.onclick = (event) => {
    // event.stopPropagation();
    intro.style.display = 'none';
    gameIni();
    powerLayer.style.display = 'flex';
    paletteColorBox[0].style.zIndex = '2';
    paletteColorBox[0].getBoundingClientRect().right
    hand.style.display = 'block';
    hand.style.right = (paletteColorBox[0].getBoundingClientRect().right + 450) + 'px';
    hand.style.bottom = (paletteColorBox[0].getBoundingClientRect().bottom - 40) + 'px';
    tip.style.right = (paletteColorBox[0].getBoundingClientRect().right + 100) + 'px';
    tip.style.bottom = (paletteColorBox[0].getBoundingClientRect().bottom - 100) + 'px';
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
        hand.style.animationFillMode = 'forwards';}, 800);

    setTimeout(() => {
        tip.style.transition = '2s';
        tip.style.right = (paletteColorBox[0].getBoundingClientRect().right - 100) + 'px';
        tip.textContent = demoText[1];
        attempt[0].style.zIndex = '2';
        hand.style.animationName = 'color-box-select';
        hand.style.animationDuration = '3s';
        hand.style.animationFillMode = 'forwards';}, 2000);




    // Показать руку, один цвет палитры
    // Рука перемещается к палитре и 
    // var event;
    // event = document.createEvent("HTMLEvents");
    // event.initEvent("dataavailable", true, true);
    // event.eventName = "dataavailable";
    // element.dispatchEvent(event);

    // https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events

}
