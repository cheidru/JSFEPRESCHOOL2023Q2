let activePopUp = {};
activePopUp.name = '';
activePopUp.obj = {};
activePopUp.validationRule = []; // validationRule = [[field1 ID, field1 Label, field1 pattern], ...]

let readers = [{}];

let activeUser = {};
activeUser.firstName = '';
activeUser.lastName = '';
activeUser.libCardCode = 0;
activeUser.libCardStats = {
    visits: 0,
    bonuses: 0,
    books: 0
};


const anyWhere = document.querySelector('body');

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
    // anyWhere.style.paddingRight = "0px";
    activePopUp.name = '';
    activePopUp.obj = {};
}

function openModalWindow(modal, name) {
    // console.log('openModal',modal, name);
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

const checkLibCardBTN = document.getElementById('check-the-card-btn');

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

registerIniBTN.addEventListener('click', (e) => {
    if (activeUser.firstName !== '') return;
    goRegisterFoo(e)}, true);
goRegister.addEventListener('click', (e) => {goRegisterFoo(e)}, true);

signUpBTN.addEventListener('click', (e) => {goRegisterFoo(e)}, true);

function goRegisterFoo(event) {
    event.stopImmediatePropagation();
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
    closeModalWindow(activePopUp.obj);
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(loginPopUp, 'loginPopUp');
}

function clearFields() {
    let fieldArray = activePopUp.validationRule;
    for (let i = 0; i < fieldArray.length; i++ ) {
        document.getElementById(`${fieldArray[i][0]}`).value = null;
    }
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
        // field id, field name, pattern, error message, field value
        ['first-name', 'First name', /[A-Za-zА-Яа-яЁё]/, ' should consist of letters only', ''],
        ['last-name', 'Last name', /[A-Za-zА-Яа-яЁё]/, ' should consist of letters only', ''],
        ['register-e-mail', 'E-mail', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, ' should consist of e-mail address', ''],
        ['register-password', 'Password', /[A-Za-zА-Яа-яЁё0-9]{8,}/, ' shouldn be not lass than 8 symbols long and consist of letters or digits', '']
    ];
    if (validateFormFields()) {
        console.log('localStorage.readers', localStorage.readers);
        let reader = {};
        reader.firstName = activePopUp.validationRule[0][4];
        reader.lastName = activePopUp.validationRule[1][4];
        reader.eMail = activePopUp.validationRule[2][4];
        reader.password = activePopUp.validationRule[3][4];
        reader.cardCode = activeUser.libCardCode;

        let arrReaders = [];

        arrReaders.push(reader);
        console.log('arrReaders =', arrReaders);
        localStorage.setItem('readers', JSON.stringify(arrReaders));
        activeUser.firstName = reader.firstName;
        activeUser.lastName = reader.lastName;
        // console.log('localStorage =', JSON.parse(localStorage.getItem('readers')));
        
        // change profile icon to initials
        profileIcon.classList.add('user-registered');
        profileIcon.innerHTML = activeUser.firstName[0] + activeUser.lastName[0];
        
        // enable library card check
        checkLibCardBTN.removeAttribute("disabled");


        closeModalWindow(activePopUp.obj);
    }
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
            // console.log("modalWindowField.value", modalWindowField.value);
            fieldValidationResult[i] = 1;

        } else {
            fieldValidationResult[i] = 2;
            fieldArray[i][4] = modalWindowField.value;
        }
    }

    if (fieldValidationResult.includes(0) || fieldValidationResult.includes(1)) {
        validationErrorMessage(fieldArray, fieldValidationResult);
        return false;
    } else {
        // check if the last name is already registered
        let usersInLocalStorage = localStorage.getItem('readers') ? localStorage.getItem('readers') : '';

        let lastNameIndex = usersInLocalStorage.indexOf(activePopUp.validationRule[1][4])
        let firstNameIndex = lastNameIndex - 14 - activePopUp.validationRule[0][4].length;
        console.log("lastNameIndex = ", lastNameIndex, "firstNameIndex = ", firstNameIndex);
        if (lastNameIndex !== -1 && firstNameIndex > 0) {
            let messageHTML = "<p>Please, check your input:</p> User with such First and Last name<br> is already redistered"
            messageWindow(messageHTML, '350px')
        } else {
            activeUser.libCardCode = libraryCardCode();
            let messageHTML = "<p>You are successfully registered! Enjoy!</p> Your library card number is " + "<span>" + activeUser.libCardCode + "</span>";
            // generate lib card code
            // Registration successful message
            messageWindow(messageHTML, '350px')
            return true;
        }
    }
}

function validationErrorMessage(fieldArray, fieldValidationResult) {
    let errorMessageText = "<p>Please, check your input:</p>";
    let errorMessageBit = "";
    let maxStringLength = 0;
    for (let i = 0; i < fieldValidationResult.length; i++) {
        switch (fieldValidationResult[i]) {
            case 0:
                errorMessageBit = "field '" + fieldArray[i][1] + "' shouldn't be blank" + "<br>";
                maxStringLength = errorMessageBit.length > maxStringLength ? errorMessageBit.length : maxStringLength;
                errorMessageText += errorMessageBit;
                break;
            case 1:
                errorMessageBit = "field '" + fieldArray[i][1] + "'" + fieldArray[i][3] + "<br>";
                maxStringLength = errorMessageBit.length > maxStringLength ? errorMessageBit.length : maxStringLength;
                errorMessageText += errorMessageBit;
        }
    }
    let errorMessageWidth = maxStringLength * 8.5 < 500 ? (maxStringLength * 8.5) + 'px' : '500px';
    messageWindow(errorMessageText, errorMessageWidth)
}

function messageWindow(messageInnerHTML, windowWidth) {
    errorMessage.style.width = windowWidth;
    errorMessage.innerHTML = messageInnerHTML;
    errorMessage.classList.remove('hidden-popup');
    errorMessagePowerLayer.classList.remove('hidden-popup');
}

errorMessagePowerLayer.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    errorMessage.textContent = "";
    errorMessage.classList.add('hidden-popup');
    errorMessagePowerLayer.classList.add('hidden-popup');
}, true)
// Form input validation END

// Generate Library Card Number

function libraryCardCode() {
    let hexAlphabet = "0123456789abcdef";
    let generatedCode = '';
    for (let i = 0 ; i < 9 ; i++) {
        generatedCode += hexAlphabet[Math.floor(Math.random() * hexAlphabet.length)];
    }
    return generatedCode;
}

// Check Digital Library Card
checkLibCardBTN.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    const readerName = document.getElementById('library-card-reader-name');
    const readerCard = document.getElementById('library-card-number');
    console.log("library-card-reader-name.value = ", library-card-reader-name.value);
    if ((readerName.value !== activeUser.firstName + ' ' + activeUser.lastName || 
        readerName.value !== activeUser.lastName + ' ' + activeUser.firstName)) {
            let messageInnerHTML = "<p>Please, check your input:</p> Reader's name is not correct"
            messageWindow(messageInnerHTML, windowWidth)

        } else if (readerCard.value == activeUser.libCardCode) {
            let messageInnerHTML = "<p>Please, check your input:</p> Card number is not correct"
            messageWindow(messageInnerHTML, windowWidth)
    } else {
        const cardStats = document.getElementById('library-card-stats');
        setTimeout(() => {
            checkLibCardBTN.classList.add('hidden');
            cardStats.classList.remove('hidden');
            cardStats.style.display = 'flex';
            document.getElementById('card-stats-visits-value').textContent = activeUser.libCardStats.visits;
            document.getElementById('card-stats-bonuses-value').textContent = activeUser.libCardStats.bonuses;
            document.getElementById('card-stats-books-value').textContent = activeUser.libCardStats.books;
        }, 10000)
    }
})

