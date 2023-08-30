let activePopUp = {};
activePopUp.name = '';
activePopUp.obj = {};

const anyWhere = document.querySelector('body');

anyWhere.addEventListener('click', (event) => {
    console.log('anyWhere pressed', event.target.parentElement);
    if (activePopUp.name == 'burgerMenu') {
        menuShowHide();
    } else {
        if (event.target == activePopUp.obj ||
             ((event.target.parentElement == activePopUp.obj ||
                event.target.parentElement.parentElement == activePopUp.obj ||
                event.target.parentElement.parentElement.parentElement == activePopUp.obj) &&
             !event.target.classList.contains('close-window-btn'))
        ) return;
        powerLayer.classList.add('hidden-popup');
        closeModalWindow(activePopUp.obj);
    }        
})

function closeModalWindow(modalWindow) {
    console.log('closeModal', modalWindow);
    powerLayer.classList.add('hidden-popup');
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

// Modal windows START
let userIsRegistered = false;

const profileIcon = document.getElementById('profile');
const powerLayer = document.getElementById('power-layer');

const loginIniPopUp = document.getElementById('login-ini-popup');
const loginIniBTN = document.getElementById('login-btn');
const registerIniBTN = document.getElementById('register-btn');

const loginPopUp = document.getElementById('login-popup');

const goRegister = document.getElementById('go-to-register');
const goLogin = document.getElementById('go-to-login');

const registerPopUp = document.getElementById('register-popup');

const signUpBTN = document.getElementById('sign-up-btn');

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

loginIniBTN.addEventListener('click', (e) => {goLoginFoo(e)}, true);
goLogin.addEventListener('click', (e) => {goLoginFoo(e)}, true);

registerIniBTN.addEventListener('click', (e) => {goRegisterFoo(e)}, true);
goRegister.addEventListener('click', (e) => {goRegisterFoo(e)}, true);

signUpBTN.addEventListener('click', (e) => {goRegisterFoo(e)}, true);

function goRegisterFoo(event) {
    event.stopImmediatePropagation();
    console.log(event = signUpBTN);
    if (event != signUpBTN) {
        closeModalWindow(activePopUp.obj);
    } else {
        document.documentElement.scrollTop = '0px';
    }
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(registerPopUp, 'registerPopUp');
}

function goLoginFoo(event) {
    event.stopImmediatePropagation();
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(loginPopUp, 'loginPopUp');
}





