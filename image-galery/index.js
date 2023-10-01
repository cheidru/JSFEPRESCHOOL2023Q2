const galleryCell = document.querySelectorAll('.gallery-item');
const galleryWrapper = document.getElementById('gallery-wrapper');
const lastPicture = document.getElementById('item-15');
const searchField = document.getElementById('search-field');
const frame = document.querySelector('body');
const searchBTN = document.getElementById('magni-glass');
const cancelBTN = document.getElementById('blank-field');

const unsplashURL = "https://api.unsplash.com/photos/?client_id=kohkTo9ZcV19ZIATEKoz3NcmhVAUERsr5At0ENH2GQk&per_page=16";
let searchString = "query=image"

let windowGotLoaded = false;
let searchEnabled = false;

//  в запросе ?qwery=image&per_page=16 должно дать 16
// по тегу image Выдост фото на разные темы

const altLocalImage = [
    "a man standing next to a tent in the desert",
    "a lone tree in the middle of a field at night",
    "a scenic view of the ocean and a road",
    "a table topped with figs and flowers on top of a cloth",
    "a path through a grove of trees in a forest",
    "a group of men standing next to each other",
    "a road lined with lots of tall bamboo trees",
    "a woman in a white dress and hat standing in tall grass",
    "an aerial view of a road and a river",
    "two old cars sitting in a field with the aurora in the background"
];

const localSmallImageSRC = [
    "./assets/img/small/photo-0-small.jpg",
    "./assets/img/small/photo-1-small.jpg",
    "./assets/img/small/photo-2-small.jpg",
    "./assets/img/small/photo-3-small.jpg",
    "./assets/img/small/photo-4-small.jpg",
    "./assets/img/small/photo-5-small.jpg",
    "./assets/img/small/photo-6-small.jpg",
    "./assets/img/small/photo-7-small.jpg",
    "./assets/img/small/photo-8-small.jpg",
    "./assets/img/small/photo-9-small.jpg",
    "./assets/img/small/photo-10-small.jpg",
    "./assets/img/small/photo-11-small.jpg",
    "./assets/img/small/photo-12-small.jpg",
    "./assets/img/small/photo-13-small.jpg",
    "./assets/img/small/photo-14-small.jpg",
    "./assets/img/small/photo-15-small.jpg"
];

const localThumbImageSRC = [
    "./assets/img/thumb/photo-0-thumb.jpg",
    "./assets/img/thumb/photo-1-thumb.jpg",
    "./assets/img/thumb/photo-2-thumb.jpg",
    "./assets/img/thumb/photo-3-thumb.jpg",
    "./assets/img/thumb/photo-4-thumb.jpg",
    "./assets/img/thumb/photo-5-thumb.jpg",
    "./assets/img/thumb/photo-6-thumb.jpg",
    "./assets/img/thumb/photo-7-thumb.jpg",
    "./assets/img/thumb/photo-8-thumb.jpg",
    "./assets/img/thumb/photo-9-thumb.jpg",
    "./assets/img/thumb/photo-10-thumb.jpg",
    "./assets/img/thumb/photo-11-thumb.jpg",
    "./assets/img/thumb/photo-12-thumb.jpg",
    "./assets/img/thumb/photo-13-thumb.jpg",
    "./assets/img/thumb/photo-14-thumb.jpg",
    "./assets/img/thumb/photo-15-thumb.jpg"
];

async function loadImage() {
    try {
        const response = await fetch(unsplashURL + '&' + searchString);
        const data = await response.json();
        console.log(data);
        dispensePictures(data);
    } catch (error) {
        console.log(error);
    }
}

function loadLocalImage() {
    galleryWrapper.style.height = imageDistribution() + 'px';
}

function imageDistribution() {
    let imgHeight = [];
    for(let pic of galleryCell) {
        imgHeight.push(parseInt(getComputedStyle(pic).height));
    }
    let totalHeight = imgHeight.reduce((totalHeight, height) => (totalHeight + height + 20), 0);
    console.log('totalHeight =', totalHeight);
    return (totalHeight / 4) * 1.2
}

function renderLocalImg(foo) {
    for(let i = 0; i < 16; i++) {
        galleryCell[i].src = localThumbImageSRC[i];
    }
    lastPicture.onload = () => foo();
}

function dispensePictures(data) {
    for(let i = 0; i < 16; i++) {
        galleryCell[i].src  = data[i].urls.thumb;
    }
}

window.addEventListener('load', () => {
    if(!windowGotLoaded) {
    searchField.focus();
    renderLocalImg(loadLocalImage);
    windowGotLoaded = true;
    }
})

window.addEventListener('resize', () => {
    location.reload();
})

searchField.addEventListener('input', () => {
        console.log('search changed', searchField.value);
    if(searchField.value.length > 0) {
        searchEnabled = true;
        frame.style.setProperty('--disabled-color', 'rgb(15, 174, 227)');
        cancelBTN.style.display = 'block';
    } else {
        searchEnabled = false;
        frame.style.setProperty('--disabled-color', 'darkgray');
        cancelBTN.style.display = 'none';
    }
})

cancelBTN.addEventListener('click', () => {
    searchField.value = '';   
    cancelBTN.style.display = 'none'; 
})