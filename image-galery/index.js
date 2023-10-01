const galleryCell = document.querySelectorAll('.gallery-item');
const galleryWrapper = document.getElementById('gallery-wrapper');
const lastPicture = document.getElementById('item-15');
const searchField = document.getElementById('search-field');
const frame = document.querySelector('body');
const searchBTN = document.getElementById('magni-glass');
const cancelBTN = document.getElementById('blank-field');
const splashBOX = document.getElementById('splashBox');
const powerLayer = document.getElementById('power-layer');


const unsplashURL = "https://api.unsplash.com/photos/?client_id=kohkTo9ZcV19ZIATEKoz3NcmhVAUERsr5At0ENH2GQk&per_page=16";
let searchString = "query=image";

let windowGotLoaded = false;
let searchEnabled = false;
let regularIMG = [];

//  в запросе ?qwery=image&per_page=16 должно дать 16
// по тегу image Выдост фото на разные темы

async function loadImage() {
    try {
        const response = await fetch(unsplashURL + '&' + searchString);
        console.log('request string =', unsplashURL + '&' + searchString);
        const data = await response.json();
        console.log(data);
        renderImg(data, resizeGalleryWrapper);
    } catch (error) {
        console.log(error);
    }
}

function resizeGalleryWrapper() {
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

function renderImg(data, foo) {
    for(let i = 0; i < 16; i++) {
        galleryCell[i].src = data[i].urls.thumb;
        regularIMG[i] = data[i].urls.regular;
        // galleryCell[i].src = localThumbImageSRC[i];
    }
    lastPicture.onload = () => foo();
}

window.addEventListener('load', () => {
    if(!windowGotLoaded) {
    searchField.focus();
    loadImage();
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

searchField.addEventListener('keydown', (event)=> {
    if(event.code == 'Enter') sendRequest();
})

searchBTN.addEventListener('click', () => {
    sendRequest();
})

function sendRequest() {
    console.log('request sent');
    searchString = "query=" + searchField.value;
    console.log('searchField.value =', searchField.value);
    loadImage();
}

cancelBTN.addEventListener('click', () => {
    searchField.value = '';   
    cancelBTN.style.display = 'none'; 
})

galleryWrapper.addEventListener('click', (event) => {
    if(event.target.tagName == 'IMG') {
        console.log(event.target.id, powerLayer.style, splashBOX.style);
        splashBOX.src = regularIMG[Number(event.target.id.substr(5))];
        powerLayer.style.display = 'flex';
        splashBOX.style.display = 'block';
        frame.style.overflow = 'hidden';
    }
})

powerLayer.addEventListener('click', () => {
    powerLayer.style.display = 'none';
    splashBOX.style.display = 'none';
    frame.style.overflow = 'auto'
})


