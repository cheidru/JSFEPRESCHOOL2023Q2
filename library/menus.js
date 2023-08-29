let activePopUp = {};
activePopUp.name = '';
activePopUp.obj = {};
// loginPopUp
// burgerMenu

const anyWhere = document.querySelector('body');

anyWhere.addEventListener('click', (e) => {
    console.log('anyWhere pressed');
    if (activePopUp.name == 'burgerMenu') {
        menuShowHide();
    } else {
        closeModalWindow(activePopUp.obj);
    }        
})

function closeModalWindow(modalWindow) {
    console.log('closeModal', modalWindow);
    modalWindow.classList.add('hidden-popup');
    activePopUp.name = '';
    activePopUp.obj = {};
}

function openModalWindow(modal, name) {
    console.log('openModal',modal, name);
    modal.classList.remove('hidden-popup');
    activePopUp.name = name;
    activePopUp.obj = modal;
}


// Burger menu START
const burgerButton = document.querySelector('.burger-button');
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

function menuShowHide() {
    if (burgerButton.classList.contains('cross-button')) {
        activePopUp.name = '';
        activePopUp.obj = {};
    } else {
        if (activePopUp.name != '') closeModalWindow(activePopUp.obj);
        activePopUp.obj = {};
        activePopUp.name = 'burgerMenu';
    }

    burgerButton.classList.toggle('burger-button');
    burgerButton.classList.toggle('cross-button');
    navBurgerMenu.classList.toggle('nav-burger-menu-visible');
    navBurgerMenu.classList.toggle('nav-burger-menu-invisible');

}
// Burger menu END

// Login START
let userIsRegistered = false;

const profileIcon = document.getElementById('profile');

const loginIniPopUp = document.getElementById('login-ini-popup');
const loginIniBTN = document.getElementById('login-btn');
const registerIniBTN = document.getElementById('register-btn');

const loginPopUp = document.getElementById('login-popup');


const registerPopUp = document.getElementById('register-popup');

profileIcon.addEventListener('click', (event) => {
    console.log("profile icon clicked");
        event.stopImmediatePropagation();
    if (activePopUp.name == 'burgerMenu') menuShowHide();
    if (activePopUp.name != '') {
        closeModalWindow(activePopUp.obj);
        return;
    }
    if (!userIsRegistered) openModalWindow(loginIniPopUp, 'loginIniPopUp');
    if (userIsRegistered) profileMiniPopUp();
})

loginIniBTN.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    closeModalWindow(loginIniPopUp);
    openModalWindow(loginPopUp, 'loginPopUp');
}, true);

registerIniBTN.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    closeModalWindow(loginIniPopUp);
    openModalWindow(registerPopUp, 'registerPopUp');
}, true);




