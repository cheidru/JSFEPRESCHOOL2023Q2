const registerWindow = document.getElementById('register-popup');
const goRegisterEng = document.getElementById('go-to-login-eng');
const goRegisterRus = document.getElementById('go-to-login-rus');
const goRegisterBTN = document.getElementById('register-btn');
const introPowerLayer = document.getElementById('intro-power-layer');
const message = document.getElementById('reg-message');

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
    if (playerRegistered) return;
    introPowerLayer.style.display = 'flex';
    registerWindow.style.display = 'block';
}


const registerBTN = document.getElementById('reg-btn');
const logInBTN = document.getElementById('signup-btn');
const registerName = document.getElementById('name');
const registerPass = document.getElementById('password');

let player = {}; // Player info object to store in players array
player.name = "";
player.password = "";
player.visits = 0;
player.score = [];

let dummyPlayerExists = false;
let playerRegistered = false;

let dummyPlayer = {
    name: 'anonymous',
    password: '',
    visits: 10,
    score: [100, 100, 200, 200, 200, 200, 300, 300, 300, 400, 400]
}

if(dummyPlayerExists == false) {
    updateLocalStorageData(dummyPlayer);
    dummyPlayerExists = true;
}

registerBTN.onclick = () => check_LogIn_Register_Input('register');

logInBTN.onclick = () => check_LogIn_Register_Input('login');

function check_LogIn_Register_Input(status) {
    player.name = registerName.value;
    player.password = registerPass.value;
    registerWindow.style.display = 'none';
    let registrationResult = checkLocalStore(player);
    console.log('registrationResult =', registrationResult);
    message.style.display = 'flex';

    if (registrationResult > 0 && status == 'login') {
        message.textContent = 'You logged in';
    } else if (registrationResult > 0 && status == 'register') {
        message.textContent = 'You are already registered';
    } else if (registrationResult == 0 && status == 'login') {
        message.textContent = "You were not registered. But you're registered now.";
        updateLocalStorageData(player);
    } else {
        message.textContent = 'You are registered';
        updateLocalStorageData(player);
    }

    playerRegistered = true;
    goRegisterBTN.style.opacity = '0.5';
}


// Check if localStorage has players with name/password contained in playerObject
// Returns an array with object from localStore which meets playerObject keys, otherwise empty array
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
function updateLocalStorageData(newPlayer) {
    let arrPlayers = [];

    if (localStorage.getItem('readers') === null) {
        // There's no 'readers' key in localStorage
        arrPlayers.push(newPlayer);
    } else {    
        let storedPlayers = JSON.parse(localStorage.getItem('players'))

        // check each reader against activeUser
        for(player in storedPlayers) {
            if (player.name == newPayer.name 
                && reader.password == activeUser.password) {
                    // Update with activeUser data
                    arrPlayers.push(newPlayer);
            } else {
                arrPlayers.push(player);
            }
        }
    }
    let newPlayersString = JSON.stringify(arrPlayers)   
    localStorage.setItem('players', newPlayersString);
}
