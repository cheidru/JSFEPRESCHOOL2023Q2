let paginationBox = document.getElementById('carousel-pagination');
let activeBullet = 1;
let aboutSliderPicSet = document.getElementById('carousel');
aboutSliderPicSet.style.left = '0px';

paginationBox.addEventListener('click', (e) => {
    if (e.target.dataset.bulindex == activeBullet) return;
   
    scrollPictures(e.target.dataset.bulindex - activeBullet);

    function scrollPictures (stepsNo) {
        let direction = stepsNo > 0 ? 1 : -1;

        for(i = 1; i <= Math.abs(stepsNo); i++) {
            let oldActiveBullet = document.querySelector(`[data-bulindex="${activeBullet}"]`);

            oldActiveBullet.classList.toggle('active-bullet');
            oldActiveBullet.parentElement.style.cursor = "pointer"

            aboutSliderPicSet.style.left = (parseInt(aboutSliderPicSet.style.left) - (475 * direction)) + "px";
            activeBullet += direction;

            let newActiveBullet = document.querySelector(`[data-bulindex="${activeBullet}"]`);

            newActiveBullet.classList.toggle('active-bullet');
            newActiveBullet.parentElement.style.cursor = "auto";
        }        
    }
})






// console.log(`Результаты самооценки:
//     1. Вёрстка соответствует макету. Ширина экрана 768px +26
//         - расстояние от картинки до точек сделано по макету (оценка за это не снижается)

//     2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. 
//     Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12

//     3. На ширине экрана 768рх реализовано адаптивное меню +12

// `);