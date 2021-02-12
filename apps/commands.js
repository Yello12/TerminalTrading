function registerCommand(key) {
    if (key === 13) {
        command(document.getElementById("input").value);
    }
}
function command(text) {
    if (parseS(text.toLowerCase()) === undefined) {
    if (game !== null && game !== undefined) {
        var command = parseL(text.toLowerCase());
        printDisplay(command);
    }}
    updateScroll();
    document.getElementById("input").value = "";
}

function parseS(text) {
    switch (text) {
    case "start":
        startGame(); 
        return "started";
    case "end":
        endGame();
        return "ended";
    default:
        break;
    }
}

function fix(object) {
    object.broken = false
    game.setMoney(-50);
    return `Now fixed: <p class = 'dull'>${object}
    </p> <p class = 'orange'>(This boosts your demand once sent)</p>`
}
function package(object) {
    object.packaged = true;
    game.setMoney(-20);
    return `Now packaged: <p class = 'dull'>${object}
    </p> <p class = 'orange'>(This boosts your demand once sent)</p>`
}
function send(object) {
    return game.sendRequest(object);
}
function dismiss(object) {
    return game.dismissRequest(object);
}
function cost(amt) {
    return game.setCost(amt);
}
function close() {
    game.setClosed(true);
    return `Business is now closed <p class = 'orange'>(This halts new packages, but does not stop previous ones.)</p>`
}
function open() {
    game.setClosed(false);
    return `Business is now open <p class = 'orange'>(This allows new packages to come in)</p>`
}

function parseL(text) {
    var an = text.split(".");
    var object = an[0];
    if (an.length > 1) { if (object in game.requests) {
        //PROPERTY
        var attribute = an[1];
        if (attribute in game.requests[object]) {
            return `<p>Shipment: </p><p class = 'dull'>
            ${object}</p><p> ${attribute}: </p><p class = 'blue'>
            ${game.requests[object][attribute]}</p>`;
        } else if (attribute === "all") {
            return `<p>Shipment: </p><p class = 'dull'>
            ${object}</p><br> details: <p class = 'blue'>
            ${JSON.stringify(game.requests[object])
                .split(",").join("<br>     ")
                .split("{").join("<br>     ")
                .split("}").join("")
                .split('"').join("")}</p>`;
        } else {return "<p class = 'red'>Invalid property</p>"}
    }} else {
        an = text.split("(");
        if (an.length > 1) {
            object = an[1].replace(")", "");
        switch (an[0]) {
        case "fix":
            return fix(object);
        case "package":
            return package(object);
        case "send":
            return send(object);
        case "dismiss":
            return dismiss(object);
        case "cost":
            return cost(object);
        case "close":
            return close();
        case "open":
            return open();
        default:
            return "<p class = 'red'>Invalid function</p>"
        }}
    } return "<p class = 'red'>Invalid command</p>"
}

function printDisplay(text) {
    document.getElementById("write").innerHTML += "> " + text + "<br>";
}