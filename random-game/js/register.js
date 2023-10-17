const registerWindow = document.getElementById('register-popup');
const goRegisterEng = document.getElementById('go-to-login-eng');
const goRegisterRus = document.getElementById('go-to-login-rus');
const goRegisterBTN = document.getElementById('register-btn');
const introPowerLayer = document.getElementById('intro-power-layer');

goRegisterRus.onclick = (event) => {
    event.stopPropagation();
    introTextRus.style.display = 'none';
    goRegister()};

goRegisterEng.onclick = (event) => {
    event.stopPropagation();
    introTextEng.style.display = 'none';
    goRegister()};

goRegisterBTN.onclick = (event) => {event.stopPropagation(); goRegister()};
registerWindow.onclick = (event) => {event.stopPropagation()};

function goRegister() {
    introPowerLayer.style.display = 'flex';
    registerWindow.style.display = 'block';
}


const registerBTN = document.getElementById('register-btn');
const logInBTN = document.getElementById('signup-btn');
const registerName = document.getElementById('name');
const registerPass = document.getElementById('password');

let players = []; // Array to store player info objects in LocalStore
let player = {}; // Player info object to store in players array
player.name = "";
player.password = "";
player.visits = 0;
player.score = [];

registerBTN.onclick = () => check_LogIn_Register_Input('new');
logInBTN.onclick = () => check_LogIn_Register_Input('old');
let checkInput = {};

function check_LogIn_Register_Input(user) {
    checkInput.name = registerName.value;
    checkInput.password = registerPass.value;

    let registrationResult = checkLocalStore(checkInput);

    if (registrationResult > 0) {
        // You successfuly logged in
    } else {
        // You are successfuly registered
        let messageInnerHTML = "<p>Please, check your input:</p> There is no such reader registered <br>or card number is not correct";
        let windowWidth = '300px';
        messageWindow(messageInnerHTML, windowWidth);    
    }
}


// Check if localStorage has players with name/password contained in keyObject
// Returns an array with object from localStore which meets keyObject keys, otherwise empty array
function checkLocalStore(playerObject) {
    let result = [];
    // There's no 'readers' key in localStorage
    if (localStorage.getItem('players') === null) return result;

    let storedPlayers = JSON.parse(localStorage.getItem('players'));

    // search in each reader record
    for (let player of storedPlayers) {
        // True only if every reader's key meets keyObject key
        let allParametersFit = false;
        for (let parameter in playerObject) {
            allParametersFit = playerObject[parameter] == player[parameter] ? true : false;

            // The first mismatch means this readers object doesn't fit
            if (allParametersFit == false) break;
        }

        if (allParametersFit == true) {
            result.push(reader);
            return result;
        }
    }
    return result;
}


// Update user profile data
function updateLocalStorageData() {
    let arrReaders = [];

    if (localStorage.getItem('readers') === null) {
        // There's no 'readers' key in localStorage
        arrReaders.push(activeUser);
    } else {    
        let storedReaders = JSON.parse(localStorage.getItem('readers'))

        // check each reader against activeUser
        for(reader of storedReaders) {
            if (reader.firstName == activeUser.firstName 
                && reader.lastName == activeUser.lastName
                && reader.password == activeUser.password
                && reader.cardCode == activeUser.cardCode) {
                    // Update with activeUser data
                    arrReaders.push(activeUser);
            } else {
                    arrReaders.push(reader);
            }
        }
    }
    let newReadersString = JSON.stringify(arrReaders)   
    localStorage.setItem('readers', newReadersString);
}
