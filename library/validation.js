
// Form input validation START
const registerSignUpBTN = document.getElementById('register-signup-btn');
const loginPopUpBTN = document.getElementById('login-login-btn');
const errorMessage = document.getElementById('error-message-box');
const errorMessagePowerLayer = document.getElementById('error-power-layer');

const getCardIntro = document.getElementById('get-a-card');
const visitProfileIntro = document.getElementById('visit-your-profile');

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
        
        // change profile icon to initials
        profileIcon.classList.add('user-registered');
        profileIcon.innerHTML = activeUser.firstName[0] + activeUser.lastName[0];
        
        // enable library card check
        checkLibCardBTN.removeAttribute("disabled");

        // Change 'get-a-card' block
        getCardIntro.classList.add('hidden-element');
        visitProfileIntro.classList.remove('hidden-element');
        
        closeModalWindow(activePopUp.obj);
    }
})

loginPopUpBTN.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    const loginMail = document.getElementById('login-e-mail');
    const loginPass = document.getElementById('log-in-password');

    activePopUp.validationRule = [
        // field id, field name, pattern, error message, field value
        ['login-e-mail', 'E-mail or readers card', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, ' should consist of e-mail address or card number', ''],
        ['login-e-mail', 'E-mail or readers card', /[a-fA-F0-9]{9}/, ' should consist of e-mail address or card number', ''],
        ['log-in-password', 'Password', /[A-Za-zА-Яа-яЁё0-9]{8,}/, ' shouldn be not lass than 8 symbols long and consist of letters or digits', '']
    ];
    if (validateFormFields(handleLoginPopupFiledValidation)) {
  
        // let reader = {};
        // reader.firstName = activePopUp.validationRule[0][4];
        // reader.lastName = activePopUp.validationRule[1][4];
        // reader.eMail = activePopUp.validationRule[2][4];
        // reader.password = activePopUp.validationRule[3][4];
        // reader.cardCode = activeUser.libCardCode;

        let arrReaders = [];

        arrReaders.push(reader);
        console.log('arrReaders =', arrReaders);
        localStorage.setItem('readers', JSON.stringify(arrReaders));
        activeUser.firstName = reader.firstName;
        activeUser.lastName = reader.lastName;
        
        // change profile icon to initials
        profileIcon.classList.add('user-registered');
        profileIcon.innerHTML = activeUser.firstName[0] + activeUser.lastName[0];
        
        // enable library card check
        checkLibCardBTN.removeAttribute("disabled");

        // Change 'get-a-card' block
        getCardIntro.classList.add('hidden-element');
        visitProfileIntro.classList.remove('hidden-element');

        closeModalWindow(activePopUp.obj);
    }
})

function handleLoginPopupFiledValidation(validationResult) {
    if (validationResult[0] == 2 || validationResult[1] == 2) {
        validationResult[0] = 2;
        validationResult[1] = 2;
    } else if (validationResult[0] == 0) {
        // fake correct validation to avoid duplicate error message for field 'E-mail or readers card'
        validationResult[1] = 2;
    }
}

function validateFormFields(validationDataHandler) {
    let fieldArray = activePopUp.validationRule;
    let fieldNumber = fieldArray.length;
    let fieldValidationResult = [];

    // validationRule - field1 ID, field1 Label, field1 pattern, fiels value
    for (let i = 0; i < fieldNumber; i++ ) {

        let modalWindowField = document.getElementById(`${fieldArray[i][0]}`);

        if (modalWindowField.value.length == 0) {
            // Input field is empty
            fieldValidationResult[i] = 0;

        } else if (!fieldArray[i][2].test(modalWindowField.value)) {
            // Input field value doesn't match pattern
            fieldValidationResult[i] = 1;

        } else {
            // Input field value is correct
            fieldValidationResult[i] = 2;
            // Store input field value in the activepopup object
            fieldArray[i][4] = modalWindowField.value;
        }
    }

    // enable special validation data handling rule
    if (validationDataHandler != null) validationDataHandler(fieldValidationResult);

    // standard validation data handling
    if (fieldValidationResult.includes(0) || fieldValidationResult.includes(1)) {
        // Validation ended up with errors. Show error message
        validationErrorMessage(fieldArray, fieldValidationResult);
        return false;
    } else {
        // if (getLocalStoreArray() === null) {

        // }
        if (activePopUp.obj === registerPopUp) {
            // check if the last name is already registered                
            if (isUserInLocalStorage(activePopUp.validationRule[0][4], activePopUp.validationRule[1][4])) {
                let messageHTML = "<p>Please, check your input:</p> User with such First and Last name<br> is already redistered"
                messageWindow(messageHTML, '350px');
            } else {
                activeUser.libCardCode = libraryCardCode();
                let messageHTML = "<p>You are successfully registered! Enjoy!</p> Your library card number is " + "<span>" + activeUser.libCardCode + "</span>";
                // generate lib card code
                // Registration successful message
                messageWindow(messageHTML, '350px');
                return true;
            }
        } else if (activePopUp.obj === loginPopUp) {
            // check if password and e-mail or card code match the one recorder in local storage
            // otherwise show error message


        }
        
    }
}

function getLocalStoreArray() {
    let arrReaders = [];
    if(localStorage.getItem('readers')) {
        arrReaders = JSON.parse(localStorage.getItem('readers'));
        return arrReaders;
    } else {
        return null;
    }
}

function isUserInLocalStorage(firstName, lastName) {
    if (!localStorage.getItem('readers')) return false;
    let usersInLocalStorage = localStorage.getItem('readers');

    let lastNameIndex = usersInLocalStorage.indexOf(lastName)
    let firstNameIndex = lastNameIndex - 14 - firstName.length;
    // console.log("lastNameIndex = ", lastNameIndex, "firstNameIndex = ", firstNameIndex);

    return (lastNameIndex !== -1 && firstNameIndex > 0) ? true : false;
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