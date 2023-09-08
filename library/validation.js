
// Form input validation START
const registerSignUpBTN = document.getElementById('register-signup-btn');
const loginPopUpBTN = document.getElementById('login-login-btn');
const errorMessage = document.getElementById('error-message-box');
const errorMessagePowerLayer = document.getElementById('error-power-layer');

const getCardIntro = document.getElementById('get-a-card');
const visitProfileIntro = document.getElementById('visit-your-profile');

const libCardCardStats = document.getElementById('library-card-stats');


// Check Register popup fields and write User data to LocalStorage
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

        activeUser.firstName = activePopUp.validationRule[0][4];
        activeUser.lastName = activePopUp.validationRule[1][4];
        activeUser.eMail = activePopUp.validationRule[2][4];
        activeUser.cardCode = activeUser.cardCode;
        activeUser.password = activePopUp.validationRule[3][4];
        activeUser.cardStats = {
            visits: 1,
            bonuses: 0,
            books: 0
        };

        authorisationCommitted('newReader');
        closeModalWindow(activePopUp.obj);
    }
})

// Check Login popup fields
loginPopUpBTN.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    activePopUp.validationRule = [
        // field id, field name, pattern, error message, field value
        ['login-e-mail', 'E-mail or readers card', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, ' should consist of e-mail address or card number', ''],
        ['login-e-mail', 'E-mail or readers card', /[a-fA-F0-9]{9}/, ' should consist of e-mail address or card number', ''],
        ['log-in-password', 'Password', /[A-Za-zА-Яа-яЁё0-9]{8,}/, ' shouldn be not lass than 8 symbols long and consist of letters or digits', '']
    ];

    if (validateFormFields(handleLoginPopupFiledValidation)) {

        authorisationCommitted();
        closeModalWindow(activePopUp.obj);
    }
})

// Check Digital Library Card fields and show card stats
checkLibCardBTN.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    const readerName = document.getElementById('library-card-reader-name');
    const readerCard = document.getElementById('library-card-number');

    // If any field is empty button doesn't work
    if (readerName.value.trim() == '' || readerCard .value.trim() == '') {
        event.preventDefault();
        return;
    }

    // Check field input against localStorage data
    let checkLibCardUser = {};
    checkLibCardUser.firstName = readerName.value.split(' ')[0];
    checkLibCardUser.lastName = readerName.value.split(' ')[1];
    checkLibCardUser.cardCode = readerCard .value;

    let searchResult = checkLocalStore(checkLibCardUser);

    console.log('checkLibCardUser = ', checkLibCardUser, 'searchResult = ', searchResult, 'searchResult length = ', searchResult.length);

    // checkLocalStore returned not empty array
    if (searchResult.length > 0) {
        event.preventDefault();

        checkLibCardBTN.style.display = "none";
        libCardCardStats.classList.remove('hidden-element');
        libCardCardStats.style.display = 'flex';

        document.getElementById('card-stats-visits-value').textContent = searchResult[0].cardStats.visits;
        document.getElementById('card-stats-bonuses-value').textContent = searchResult[0].cardStats.bonuses;
        document.getElementById('card-stats-books-value').textContent = searchResult[0].cardStats.books;

        setTimeout(() => {
            checkLibCardBTN.style.display = "inline-flex"
            libCardCardStats.style.display = 'none';
            libCardCardStats.classList.add('hidden-element');
            readerName.value = '';
            readerCard.value = '';
        }, 10000)

    } else {
        let messageInnerHTML = "<p>Please, check your input:</p> There is no such reader registered <br>or card number is not correct";
        let windowWidth = '300px';
        messageWindow(messageInnerHTML, windowWidth);    
    }
    
}, true)

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
        // Check data in Register popup fields 
        if (activePopUp.obj === registerPopUp) {
            // check if the last name is already registered ie checkLocalStore returns not empty array
            if (checkLocalStore({firstName: `${fieldArray[0][4]}`, lastName: `${fieldArray[1][4]}`}).length > 0) {
                let messageHTML = "<p>Please, check your input:</p> User with such First and Last name<br> is already redistered"
                messageWindow(messageHTML, '350px');
            } else {
                // generate lib card code
                activeUser.cardCode = libraryCardCode();
                let messageHTML = "<p>You are successfully registered! Enjoy!</p> Your library card number is " + "<span>" + activeUser.cardCode + "</span>";

                // Registration successful message
                messageWindow(messageHTML, '350px');
                return true;
            }
        // Check data in Login popup fields 
        } else if (activePopUp.obj === loginPopUp) {
            // Keys to search depend on whether e-mail or readers card was entered in the first field
            let searchKeys = fieldArray[0][4] == '' ? {cardCode: `${fieldArray[1][4]}`, password: `${fieldArray[2][4]}`} : {eMail: `${fieldArray[0][4]}`, password: `${fieldArray[2][4]}`};
            // check if password and e-mail or card code match the one recorder in local storage
            let checkResult = checkLocalStore(searchKeys);
            if (checkResult.length > 0) {
                // assign stored reader obj to activePopUp.obj
                activeUser = checkResult[0];
                return true;
            } else {
                // otherwise show error message
                let messageHTML = "<p>Please, check your input:</p>User with such e-mail or reader's card<br>and password is not registered yet"
                messageWindow(messageHTML, '350px');
            }
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
    // prevent scroll
    anyWhere.style.overflow = "hidden";
}

errorMessagePowerLayer.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    errorMessage.textContent = "";
    errorMessage.classList.add('hidden-popup');
    errorMessagePowerLayer.classList.add('hidden-popup');
    // allow scroll
    anyWhere.style.overflow = "visible";
}, true)

// Form input validation END