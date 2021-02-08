const boxNames = ["chicken", "foodbarrel", "letterbox", "metalcargo", "eggs", "winston", "dildo"];
var game = null;
var request;
var removal;
function startGame() {
    game = null;
    names = shuffle(boxNames);
    game = new Game(1000, 1);
    makeRequest();
}
function endGame() {
    clearTimeout(request);
    clearTimeout(removal);
    game = null;
}
function makeRequest() {
    addRequest();
}
function removeRequest(name) {
    if (game.requests[name] !== null) {
        delete game.requests[name];
    }
}
function timeoutRequest(name) {
    if (name in game.requests) {
        calculateImpact(name, false);
        removeRequest(name);
        printDisplay(`<p class = 'warning'>Shipping timed out: </p><p class = 'object'>${name}</p>`);
    }
}
function addRequest() {
    const name = boxNames.shift();
    
    const distance = parseInt((Math.random() * 790) + 10);
    const weight = parseInt((Math.random() * 380) + 20);
    var packaged = false;
    var broken = false;
    if (Math.random() > 0.6) {
        packaged = true; 
    }
    if (Math.random() > 0.6) {
        broken = true;
    }
    game.requests[name] = {
        "weight" : weight,
        "distance" : distance, 
        "broken" : broken, 
        "packaged" : packaged,
    };
    game.money += 200;
    console.log(game.money);
    printDisplay(`<p class = 'new'>New package: </p><p class = 'object'>${name}</p>`);
    request = setTimeout(function() {makeRequest();}, (Math.random() * 24000) + 16000);
    removal = setTimeout(function() {timeoutRequest(name);boxNames.push(name);}, 40000);
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
