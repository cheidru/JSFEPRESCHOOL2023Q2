
// About-slider START
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

    if (e.target.dataset.bulindex == activeBullet) return;   
    scrollPictures(e.target.dataset.bulindex - activeBullet);
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
        if (activeBullet == 1) {
            arrowLeft.classList.add('arrow-disabled');
            arrowRight.classList.remove('arrow-disabled');
        } else if (activeBullet == 5) {
            arrowRight.classList.add('arrow-disabled');
            arrowLeft.classList.remove('arrow-disabled');   
        } else {
            arrowLeft.classList.remove('arrow-disabled');
            arrowRight.classList.remove('arrow-disabled');
        }
    }        
}

function arrowClicked(arrow) {
    if ((arrow == LEFT_ARROW && activeBullet == 1) || (arrow == RIGHT_ARROW && activeBullet == 5)) return;
    let stepsNo = arrow == LEFT_ARROW ? -1 : 1;
    scrollPictures(stepsNo);
}
// About-slider END

// Favourite season changer START
let favouriteRadios = document.getElementById('season-pick-radios');
let favouriteBooks = document.getElementById('favorites-items-wrapper');
let activeSeason = 'Winter';
let allSeasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
let seasonChangeInProgress = false;
let seasonChangeBreakID = 0;

let favourite1 = document.getElementById('item1');
let favourite2 = document.getElementById('item2');
let favourite3 = document.getElementById('item3');
let favourite4 = document.getElementById('item4');
let favourite5 = document.getElementById('item5');
let favourite6 = document.getElementById('item6');
let favourite7 = document.getElementById('item7');
let favourite8 = document.getElementById('item8');
let favourite9 = document.getElementById('item9');
let favourite10 = document.getElementById('item10');
let favourite11 = document.getElementById('item11');
let favourite12 = document.getElementById('item12');
let favourite13 = document.getElementById('item13');
let favourite14 = document.getElementById('item14');
let favourite15 = document.getElementById('item15');
let favourite16 = document.getElementById('item16');

favouriteRadios.addEventListener('click', (e) => {
    if (e.target.textContent == activeSeason) return;
    if (e.target.tagName != 'LABEL') return;
    if (seasonChangeInProgress) clearTimeout(seasonChangeBreakID);
    seasonChange(e.target.textContent);
})

favouriteBooks.addEventListener('click', (e) => {
    if (seasonChangeInProgress) clearTimeout(seasonChangeBreakID);
    if (e.target.classList.contains('favorite-button')) return;
    let newSeason = activeSeason == 'Autumn' ? 'Winter' : allSeasons[allSeasons.indexOf(activeSeason) + 1];
    seasonChange(newSeason);
    // let radioButtonId = newSeason.toLowerCase();
    document.getElementById(newSeason.toLowerCase()).checked = true;
    // сделать активной новую кнопку
})

function seasonChange(newSeason) {
    seasonChangeInProgress = true;
    favouriteBooks.classList.add('fade-out');
    favouriteBooks.classList.remove('fade-in');

    seasonChangeBreakID = setTimeout(() => {
        seasonBooksChange(activeSeason);
        seasonBooksChange(newSeason);
        activeSeason = newSeason;
        favouriteBooks.classList.remove('fade-out');
        favouriteBooks.classList.add('fade-in');
        seasonChangeInProgress = false;
    }, 700);
    

}

function seasonBooksChange(season) {
    switch(season) {
        case 'Winter':
            favourite1.classList.toggle('hidden');
            favourite1.classList.toggle('assignOrder1');
            favourite2.classList.toggle('hidden');
            favourite2.classList.toggle('assignOrder2');
            favourite3.classList.toggle('hidden');
            favourite3.classList.toggle('assignOrder3');
            favourite4.classList.toggle('hidden');
            favourite4.classList.toggle('assignOrder4');
            break;
        case 'Spring':
            favourite5.classList.toggle('hidden');
            favourite5.classList.toggle('assignOrder1');
            favourite6.classList.toggle('hidden');
            favourite6.classList.toggle('assignOrder2');
            favourite7.classList.toggle('hidden');
            favourite7.classList.toggle('assignOrder3');
            favourite8.classList.toggle('hidden');
            favourite8.classList.toggle('assignOrder4');
            break;
        case 'Summer':
            favourite9.classList.toggle('hidden');
            favourite9.classList.toggle('assignOrder1');
            favourite10.classList.toggle('hidden');
            favourite10.classList.toggle('assignOrder2');
            favourite11.classList.toggle('hidden');
            favourite11.classList.toggle('assignOrder3');
            favourite12.classList.toggle('hidden');
            favourite12.classList.toggle('assignOrder4');
            break;
        case 'Autumn':
            favourite13.classList.toggle('hidden');
            favourite13.classList.toggle('assignOrder1');
            favourite14.classList.toggle('hidden');
            favourite14.classList.toggle('assignOrder2');
            favourite15.classList.toggle('hidden');
            favourite15.classList.toggle('assignOrder3');
            favourite16.classList.toggle('hidden');
            favourite16.classList.toggle('assignOrder4');
            break;
    }
}
// Favourite season changer END

// Register START


// Register ENDS


// console.log(`Результаты самооценки:
//     1. Вёрстка соответствует макету. Ширина экрана 768px +26
//         - расстояние от картинки до точек сделано по макету (оценка за это не снижается)

//     2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. 
//     Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12

//     3. На ширине экрана 768рх реализовано адаптивное меню +12

// `);