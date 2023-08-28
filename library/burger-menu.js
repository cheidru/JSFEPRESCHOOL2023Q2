let activePopUp = {};
const burgerButton = document.querySelector('.burger-button');
const anyWhere = document.querySelector('body');
const navBurgerMenu = document.querySelector('.nav-ul');

navBurgerMenu.classList.add('nav-burger-menu-invisible');

burgerButton.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    menuShowHide();
})

navBurgerMenu.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    menuShowHide();
})

anyWhere.addEventListener('click', (e) => {
    if (burgerButton.classList.contains('cross-button')) {
        menuShowHide();
    }
})

function menuShowHide() {
    burgerButton.classList.toggle('burger-button');
    burgerButton.classList.toggle('cross-button');
    navBurgerMenu.classList.toggle('nav-burger-menu-visible');
    navBurgerMenu.classList.toggle('nav-burger-menu-invisible');
}

function carouselSliderMove (direction) {
    let scrWidth = screenWidth();    
}

function seasonChange (season) {
    let scrWidth = screenWidth();
}


let userIsRegistered = false;
const profileIcon = document.getElementById('profile');


// Login START
profileIcon.addEventListener('click', () => {
    console.log("profile icon clicked");
    if (!userIsRegistered) loginIniPopUp();
    if (userIsRegistered) profileMiniPopUp();
})

function loginIniPopUp() {
    console.log("login popup show");
    const loginPopUp = document.getElementById('login-ini-popup');

    loginPopUp.classList.remove('hidden-popup');
    activePopUp = loginPopUp;
}

