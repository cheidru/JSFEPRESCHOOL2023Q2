let paginationBox = document.getElementById('carousel-pagination');
let activeBullet = 1;
let aboutSliderPicSet = document.getElementById('carousel');

paginationBox.addEventListener('click', (e) => {
    let sliderStyles = getComputedStyle(aboutSliderPicSet);
    // console.log("bullet clicked", e.target.dataset.bulindex, e.target);
    if (e.target.dataset.bulindex == activeBullet) return;
   
    scrollPictures(e.target.dataset.bulindex - activeBullet);

    function scrollPictures (stepsNo) {
        if (stepsNo > 0) {
            console.log(stepsNo, sliderStyles.left);
            for(i = 0; i < stepsNo; i++) {
                let oldActiveBullet = document.querySelector(`[data-bulindex="${activeBullet}"]`);
                oldActiveBullet.classList.toggle('active-bullet');
                let onePictureShift = `${parseInt(sliderStyles.left) - 475}px`;
                // shift pictures left
                aboutSliderPicSet.style.transform = "translateX(" + onePictureShift + ")";
                activeBullet++
                console.log(e.target.classList);
                e.target.classList.toggle('active-bullet');
                console.log(e.target.classList);

                console.log("bullet changed");
                // `${activeBullet - 1}`
            }
        }




    }
    // change active bullet to a new one
})






// console.log(`Результаты самооценки:
//     1. Вёрстка соответствует макету. Ширина экрана 768px +26
//         - расстояние от картинки до точек сделано по макету (оценка за это не снижается)

//     2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. 
//     Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12

//     3. На ширине экрана 768рх реализовано адаптивное меню +12

// `);