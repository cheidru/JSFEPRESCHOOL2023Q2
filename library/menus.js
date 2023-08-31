let activePopUp = {};
activePopUp.name = '';
activePopUp.obj = {};
activePopUp.validationRule = []; // validationRule = [[field1 ID, field1 Label, field1 pattern], ...]

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
    anyWhere.style.overflow = "visible";
    // anyWhere.style.paddingRight = "0px";
    activePopUp.name = '';
    activePopUp.obj = {};
}

function openModalWindow(modal, name) {
    console.log('openModal',modal, name);
    modal.classList.remove('hidden-popup');
    anyWhere.style.overflow = "hidden";
    // anyWhere.style.paddingRight = "15px";
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
    if (event.target !== signUpBTN) {
        closeModalWindow(activePopUp.obj);
    } else {
        document.documentElement.scrollTop = '0px';
    }
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(registerPopUp, 'registerPopUp');
}

function goLoginFoo(event) {
    event.stopImmediatePropagation();
    closeModalWindow(activePopUp.obj);
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(loginPopUp, 'loginPopUp');
}
// Modal windows END

// Form input validation START
const registerSignUpBTN = document.getElementById('register-signup-btn');
const loginPopUpBTN = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message-box');
const errorMessagePowerLayer = document.getElementById('error-power-layer');

registerSignUpBTN.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    activePopUp.validationRule = [
        ['first-name', 'First name', /A-Za-zА-Яа-яЁё/, ' должно содержать только буквы'],
        ['last-name', 'Last name', /A-Za-zА-Яа-яЁё/, ' должно содержать только буквы'],
        ['register-e-mail', 'E-mail', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, ' должно содержать адрес электронной почты'],
        ['register-password', 'Password', /[A-Za-zА-Яа-яЁё0-9]{8,}/, ' должно быть не короче 8 символов и содержать буквы или цифры']
    ];
    validateFormFields();
})


loginPopUpBTN.addEventListener('click', () => {

})

function validateFormFields() {
    let fieldArray = activePopUp.validationRule;
    let fieldNumber = fieldArray.length;
    let fieldValidationResult = [];
    // validationRule - field1 ID, field1 Label, field1 pattern

    for (let i = 0; i < fieldNumber; i++ ) {

        let modalWindowField = document.getElementById(`${fieldArray[i][0]}`);

        if (modalWindowField.value.length == 0) {

            fieldValidationResult[i] = 0;

        } else if (!fieldArray[i][2].test(modalWindowField.value)) {
            fieldValidationResult[i] = 1;

        } else {
            fieldValidationResult[i] = 2;        
        }
    }

    if (fieldValidationResult.includes(0) || fieldValidationResult.includes(1)) {
        validationErrorMessage(fieldArray, fieldValidationResult);
    }
    return
}

function validationErrorMessage(fieldArray, fieldValidationResult) {
    let errorMessageText = "<p>Проверьте корректность заполнения полей:</p>";
    let errorMessageBit = "";
    let maxStringLength = 0;
    for (let i = 0; i < fieldValidationResult.length; i++) {
        switch (fieldValidationResult[i]) {
            case 0:
                errorMessageBit = "поле " + fieldArray[i][1] + " не должно быть пустым" + "<br>";
                maxStringLength = errorMessageBit.length > maxStringLength ? errorMessageBit.length : maxStringLength;
                errorMessageText += errorMessageBit;
                break;
            case 1:
                errorMessageBit = "поле " + fieldArray[i][1] + fieldArray[i][3] + "<br>";
                maxStringLength = errorMessageBit.length > maxStringLength ? errorMessageBit.length : maxStringLength;
                errorMessageText += errorMessageBit;
        }
    }
    errorMessage.style.width = maxStringLength * 8.5 < 500 ? (maxStringLength * 8.5) + 'px' : '500px';
    errorMessage.innerHTML = errorMessageText;
    console.log("maxStringLength", maxStringLength, "errorMessage.style.width", errorMessage.style.width);
    errorMessage.classList.remove('hidden-popup');
    errorMessagePowerLayer.classList.remove('hidden-popup');
}

errorMessagePowerLayer.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    errorMessage.textContent = "";
    errorMessage.classList.add('hidden-popup');
    errorMessagePowerLayer.classList.add('hidden-popup');
}, true)
