let activePopUp = {};
activePopUp.name = '';
activePopUp.obj = {};
activePopUp.validationRule = []; // validationRule = [[field1 ID, field1 Label, field1 pattern], ...]

let readers = [{}];

let activeUser = {};
activeUser.firstName = '';
activeUser.lastName = '';
activeUser.cardCode = 0;
activeUser.cardPurchased = false;
activeUser.password = '';
activeUser.bookList = [4, 12];
activeUser.cardStats = {
    visits: 1,
    bonuses: 0,
    books() {return this.bookList.length}
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
        // if clicked inside popup and not close-window-btn, skip it
        if (event.target == activePopUp.obj ||
             ((event.target.parentElement == activePopUp.obj ||
                event.target.parentElement.parentElement == activePopUp.obj ||
                event.target.parentElement.parentElement.parentElement == activePopUp.obj ||
                event.target.parentElement.parentElement.parentElement.parentElement == activePopUp.obj
                ) &&
             !event.target.classList.contains('close-window-btn')) ||
             ( event.target == errorMessage || event.target.parentElement == errorMessage)
        ) {
            return;
        } else {
            powerLayer.classList.add('hidden-popup');
            if (activePopUp.name == 'buyCardPopUp') buyCardPopUp.style.display = 'none';
            if (activePopUp.name == 'myProfilePopUp') myProfilePopUp.style.display = 'none';
            closeModalWindow(activePopUp.obj);
        }


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
const visitProfileLibCardIntroBTN = document.getElementById('visit-your-profile-btn');

const myProfileBTN = document.getElementById('my-profile-btn');
const myProfilePopUp = document.getElementById('my-profile-popup');
const myProfileVisitNumber = document.getElementById('my-profile-visits-value');
const myProfileBonusNumber = document.getElementById('my-profile-bonuses-value');
const myProfileBookNumber = document.getElementById('my-profile-books-value');

const buyCardPopUp = document.getElementById('buy-a-card-popup');

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

visitProfileLibCardIntroBTN.addEventListener('click', (e) => {goMyProfileFoo(e)});


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
    if (event.target !== visitProfileLibCardIntroBTN) {
        closeModalWindow(activePopUp.obj);
        clearFields();
    } else {
        document.documentElement.scrollTop = '0px';
    }

    const profileInitials = document.getElementById('id-box');
    profileInitials.textContent = activeUser.firstName[0] + activeUser.lastName[0];
    const profileName = document.getElementById('name-box');
    profileName.textContent = activeUser.firstName + ' ' + activeUser.lastName;
    if (activeUser.firstName.length + activeUser.lastName.length > 10) {
        profileName.style.height = 'auto';
        profileName.style.padding = '5px';
    }

    myProfileVisitNumber.textContent = activeUser.cardStats.visits;
    myProfileBonusNumber.textContent = activeUser.cardStats.bonuses;
    myProfileBookNumber.textContent = activeUser.cardStats.books;

    myProfilePopUp.style.display = 'flex';
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(myProfilePopUp, 'myProfilePopUp');
}

function goBuyCard(event) {
    event.stopImmediatePropagation();
    
    document.documentElement.scrollTop = '0px';
    buyCardPopUp.style.display = 'flex';
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(buyCardPopUp, 'buyCardPopUp');

}


function clearFields() {
    let fieldArray = activePopUp.validationRule;
    for (let i = 0; i < fieldArray.length; i++ ) {
        document.getElementById(`${fieldArray[i][0]}`).value = null;
    }
}
// Modal windows END




