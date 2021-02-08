function registerCommand(key) {
    if (key === 13) {
        command(document.getElementById("input").value);
    }
}
function command(text) {
    var command = parseS(text.toLowerCase());
    if (command === undefined) {
        command = parseL(text.toLowerCase());
    }
    printDisplay(command);
    updateScroll();
    document.getElementById("input").value = "";
}

function parseS(text) {
    if (text === "help") {
        return "help text";
    } else if (text === "start") {
        startGame();
        return "Starting game";
    } else if (text == "end") {
        endGame();
        return "Ending game";
    }
}

function fix(object) {
    game.requests[object]["broken"] = false;
    game.money -= 40;
    console.log(game.money);
    return `Fixed: <p class = 'object'>${object}</p>`;
}
function package(object) {
    game.requests[object]["packaged"] = true;
    game.money -= 20;
    console.log(game.money);
    return `Packaged: <p class = 'object'>${object}</p>`;
}
function send(object) {
    calculateImpact(object, true);
    removeRequest(object);
    return `Sent: <p class = 'object'>${object}</p>`
}
function dismiss(object) {
    calculateImpact(object, false);
    removeRequest(object);
    return `Dismissed: <p class = 'object'>${object}</p>`
}

function calculateImpact(name, sent) {
    var object = game.requests[name];
    var cost = 60;
    var h_effect = 0.5;
    if (sent) {h_effect *= 2;} else {h_effect *= 0.5;}
    if (object.broken) {h_effect *= 0.6;} else {h_effect *= 1.4;}
    if (object.packaged) {h_effect *= 1.2;} else {h_effect *= 0.8;}
    // h_effect *= 1 / parseInt(object.distance / 80);
    cost *= parseInt(object.weight / 100);
    game.money -= cost;
    game.happiness *= h_effect;
}

function parseL(text) {
    var an = text.split(".");
    var object = an[0];
    if (an.length > 1 && object in game.requests) {
        // MULTI WORD COMMANDS
        var attribute = an[1];
        if (attribute.endsWith(")") === true) {
            var ar = attribute.split("(");
            ar[1] = ar[1].replace(")", "");         
            //FUNCTION
            switch (ar[0]) {
                case "fix":
                    return fix(object);
                case "package":
                    return package(object);
                case "dismiss":
                    return dismiss(object);
                case "send":
                    return send(object);
                default:
                    return "<p class = 'error'>Invalid function</p>"
            }
        } else {
            //PROPERTY
            if (attribute in game.requests[object]) {
                return `<p>Shipment: </p><p class = 'object'>${object}</p><p> ${attribute}: </p><p class = 'property'>${game.requests[object][attribute]}</p>`;
            } else if (attribute === "all") {
                return `<p>Shipment: </p><p class = 'object'>${object}</p> details: <p class = 'property'>${JSON.stringify(game.requests[object])}</p>`;
            } else {return "<p class = 'error'>Invalid property</p>"}
        }
    }
    return "<p class = 'error'>Invalid command</p>"
}

function printDisplay(text) {
    document.getElementById("display").innerHTML += "> " + text + "<br>";
}