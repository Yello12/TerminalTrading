function registerCommand(key) {
    var input = document.getElementById("input").value;
    if (key === 13 && input !== "") {
        command(input);
        document.getElementById('input').style.transform = "scale(1.02, 1.1)";
        setTimeout(function() {document.getElementById('input').style.transform = "scale(1, 1)";}, 100);
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
    if (object in game.requests) {
        game.requests[object].broken = false;
        game.setMoney(-40);
        return `Now fixed: <p class = 'dull'>${object}
        </p> <p class = 'orange'>(This boosts your demand once sent)</p>`
    } else {
        return "<p class = 'red'>Invalid package</p>"
    }
}
function package(object) {
    if (object in game.requests) {
        game.requests[object].packaged = true;
        game.setMoney(-20);
        return `Now packaged: <p class = 'dull'>${object}
        </p> <p class = 'orange'>(This boosts your demand once sent)</p>`
    } else {
        return "<p class = 'red'>Invalid package</p>"
    }
}
function send(object) {
    if (object in game.requests) {
        return game.sendRequest(object);
    } else {
        return "<p class = 'red'>Invalid package</p>"
    }
}
function dismiss(object) {
    if (object in game.requests) {
        return game.dismissRequest(object);
    } else {
        return "<p class = 'red'>Invalid package</p>"
    }
}
function cost(amt) {
    if (Helper.isNumeric(amt)) {
        return game.setCost(amt);
    } else {
        return "<p class = 'red'>Invalid value</p>"
    }
}
function close() {
    game.setClosed(true);
    return `Business is now closed <p class = 'orange'>(This halts new packages, but does not stop previous ones)</p>`
}
function open() {
    game.setClosed(false);
    return `Business is now open <p class = 'orange'>(This allows new packages to come in)</p>`
}
function status() {
    return `Closed: <p class = 'blue'>${game.closed}</p> Service cost: <p class = 'blue'>${game.cost}</p>`
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
        case "status":
            return status();
        default:
            return "<p class = 'red'>Invalid function</p>"
        }}
    } return "<p class = 'red'>Invalid command</p>"
}

function printDisplay(text) {
    document.getElementById("write").innerHTML += "> " + text + "<br>";
}