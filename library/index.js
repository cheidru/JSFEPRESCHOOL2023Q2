let paginationBox = document.getElementById('carousel-pagination');
let activeBullet = 1;
let arrowLeft = document.getElementById('left-arrow');
let arrowRight = document.getElementById('right-arrow');
let arrowLeftDisabled = true;
let arrowRightDisabled = false;
const LEFT_ARROW = 0;
const RIGHT_ARROW = 1;


let aboutSliderPicSet = document.getElementById('carousel');
aboutSliderPicSet.style.left = '0px';

let aboutIMG = document.querySelectorAll('#carousel img')[1];

paginationBox.addEventListener('click', (e) => {
    
    console.log("paginationBox start, activeBullet = ",activeBullet);
    if (e.target.dataset.bulindex == activeBullet) return;   
    scrollPictures(e.target.dataset.bulindex - activeBullet);
    console.log("paginationBox end, activeBullet = ",activeBullet);
})

arrowLeft.addEventListener('click', () => {arrowClicked(LEFT_ARROW)});
arrowRight.addEventListener('click', () => {arrowClicked(RIGHT_ARROW)});

function scrollPictures (stepsNo) {
    let direction = stepsNo > 0 ? 1 : -1;

    for(i = 1; i <= Math.abs(stepsNo); i++) {
        let oldActiveBullet = document.querySelector(`[data-bulindex="${activeBullet}"]`);

        oldActiveBullet.classList.toggle('active-bullet');
        oldActiveBullet.parentElement.style.cursor = "pointer"

        let imgWidth = aboutIMG.offsetWidth;

        aboutSliderPicSet.style.left = (parseInt(aboutSliderPicSet.style.left) - ((imgWidth + 25) * direction)) + "px";
        activeBullet += direction;

        let newActiveBullet = document.querySelector(`[data-bulindex="${activeBullet}"]`);

        newActiveBullet.classList.toggle('active-bullet');
        newActiveBullet.parentElement.style.cursor = "auto";

        if (activeBullet == 1) disableArrow(true, LEFT_ARROW);
        if (activeBullet == 5) disableArrow(true, RIGHT_ARROW);
        if (activeBullet > 1) disableArrow(false, LEFT_ARROW);
        if (activeBullet < 5) disableArrow(false, RIGHT_ARROW);
    }        
}

function arrowClicked(arrow) {
    if ((arrow == LEFT_ARROW && activeBullet == 1) || (arrow == RIGHT_ARROW && activeBullet == 5)) return;
    let stepsNo = arrow == LEFT_ARROW ? -1 : 1;
    scrollPictures(stepsNo);
}

function disableArrow(disable, whichArrow) {
    console.log("disableArrow anabled", ", activeBullet = ", activeBullet);
    switch(+disable + '' + whichArrow) { // make action code
        case '11': // disable = true; whichArrow = RIGHT_ARROW
            arrowRightDisabled = true;
            arrowLeftDisabled = false;           

    } 

}


// console.log(`Результаты самооценки:
//     1. Вёрстка соответствует макету. Ширина экрана 768px +26
//         - расстояние от картинки до точек сделано по макету (оценка за это не снижается)

//     2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. 
//     Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12

//     3. На ширине экрана 768рх реализовано адаптивное меню +12

// `);