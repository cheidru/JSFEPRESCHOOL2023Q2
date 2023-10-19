const demo = document.getElementById('see-demo');
const hand = document.getElementById('demo-hand');

demo.onclick = (event) => {
    // event.stopPropagation();

    intro.style.display = 'none';
    gameIni();
    powerLayer.style.display = 'flex';
    paletteColorBox[0].style.zIndex = '2';
    hand.style.display = 'block';
    hand.style.reansform = 'translate(-200px, -200px)';




    // Показать руку, один цвет палитры
    // Рука перемещается к палитре и 
    // var event;
    // event = document.createEvent("HTMLEvents");
    // event.initEvent("dataavailable", true, true);
    // event.eventName = "dataavailable";
    // element.dispatchEvent(event);

    // https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events

}
