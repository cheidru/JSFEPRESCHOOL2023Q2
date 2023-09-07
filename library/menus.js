let activePopUp = {};
activePopUp.name = '';
activePopUp.obj = {};
activePopUp.validationRule = []; // validationRule = [[field1 ID, field1 Label, field1 pattern], ...]

let readers = [{}];

let activeUser = {};
activeUser.firstName = '';
activeUser.lastName = '';
activeUser.cardCode = 0;
activeUser.password = '';
activeUser.cardStats = {
    visits: 0,
    bonuses: 0,
    books: 0
};


const anyWhere = document.querySelector('body');

// Check if body element has a scroll bar
let anyWhereHasScrollBar = true;
anyWhere.addEventListener('resize', () => {
    anyWhereHasScrollBar = div.scrollHeight < div.clientHeight; 
})

anyWhere.addEventListener('click', (event) => {
    if (activePopUp.name == '') return;
    // console.log('anyWhere pressed', event.target.parentElement);
    if (activePopUp.name == 'burgerMenu') {
        menuShowHide();
    } else {
        if (event.target == activePopUp.obj ||
             ((event.target.parentElement == activePopUp.obj ||
                event.target.parentElement.parentElement == activePopUp.obj ||
                event.target.parentElement.parentElement.parentElement == activePopUp.obj) &&
             !event.target.classList.contains('close-window-btn')) ||
             ( event.target == errorMessage || event.target.parentElement == errorMessage)
        ) return;
        powerLayer.classList.add('hidden-popup');
        closeModalWindow(activePopUp.obj);
    }        
})

function closeModalWindow(modalWindow) {
    // console.log('closeModal', modalWindow);
    powerLayer.classList.add('hidden-popup');
    modalWindow.classList.add('hidden-popup');
    anyWhere.style.overflow = "visible";
    anyWhere.style.paddingRight = "0px";
    activePopUp.name = '';
    activePopUp.obj = {};
}

function openModalWindow(modal, name) {
    // console.log('openModal',modal, name);
    modal.classList.remove('hidden-popup');
    // Hide overflow to prevent window scroll down
    anyWhere.style.overflow = "hidden";
    // Add 15px padding to compensate scroll bar removing when overflow is hidden
    anyWhere.style.paddingRight = "16px";
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

const profileMiniPopup = document.getElementById('profile-mini-popup');
const profileMiniPopupTitle = document.getElementById('profile-minipopup-title');

const signUpBTN = document.getElementById('sign-up-btn');
const logInBTN = document.getElementById('log-in-btn');
const checkLibCardBTN = document.getElementById('check-the-card-btn');

const myProfileBTN = document.getElementById('my-profile-btn');
const myProfilePopUp = document.getElementById('my-profile-popup');

profileIcon.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
    if (activePopUp.name == 'burgerMenu') menuShowHide();
    if (activePopUp.name != '') {
        closeModalWindow(activePopUp.obj);
        return;
    }

    // Check if user logged in or registered
    if (activeUser.firstName == '') {  
        // Open Profile LogIn/Register popup
        openModalWindow(loginIniPopUp, 'loginIniPopUp');
        // Open Profile MyProfile/LogOut popup
    } else openModalWindow(profileMiniPopup, 'profileMiniPopup');
})

loginIniBTN.addEventListener('click', (e) => {goLoginFoo(e)}, true);
goLogin.addEventListener('click', (e) => {goLoginFoo(e)}, true);

registerIniBTN.addEventListener('click', (e) => {
    if (activeUser.firstName !== '') return;
    goRegisterFoo(e)}, true);

goRegister.addEventListener('click', (e) => {goRegisterFoo(e)}, true);

signUpBTN.addEventListener('click', (e) => {goRegisterFoo(e)}, true);

logInBTN.addEventListener('click', (e) => {goLoginFoo(e)}, true);

myProfileBTN.addEventListener('click', (e) => {goMyProfileFoo(e)}, true);

function goRegisterFoo(event) {
    event.stopImmediatePropagation();
    // Check if Sign Up button in Library Card section is clicked
    if (event.target !== signUpBTN) {
        closeModalWindow(activePopUp.obj);
    } else {
        document.documentElement.scrollTop = '0px';
    }
    clearFields();
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(registerPopUp, 'registerPopUp');
}

function goLoginFoo(event) {
    event.stopImmediatePropagation();
    // Check if Log In button in Library Card section is clicked
    if (event.target !== logInBTN && !event.target.classList.contains("favorite-button")) {
        closeModalWindow(activePopUp.obj);
    } else {
        document.documentElement.scrollTop = '0px';
    }
    clearFields();
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(loginPopUp, 'loginPopUp');
}

function goMyProfileFoo(event) {
    event.stopImmediatePropagation();
        clearFields();
        powerLayer.classList.remove('hidden-popup');
        openModalWindow(myProfilePopUp, 'myProfilePopUp');
}


function clearFields() {
    let fieldArray = activePopUp.validationRule;
    for (let i = 0; i < fieldArray.length; i++ ) {
        document.getElementById(`${fieldArray[i][0]}`).value = null;
    }
}
// Modal windows END




