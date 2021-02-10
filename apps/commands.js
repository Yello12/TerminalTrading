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
    game.setMoney(-60);
    return `Fixed: <p class = 'object'>${object}</p><p class = 'error'> -$60</p>`;
}
function package(object) {
    game.requests[object]["packaged"] = true;
    game.setMoney(-30);
    return `Packaged: <p class = 'object'>${object}</p><p class = 'error'> -$30</p>`;
}
function send(object) {
    var imp = calculateImpact(object, true);
    game.removeRequest(object);
    return `Sent: <p class = 'object'>${object}</p><p class = 'property'> ${imp[0]}</p>`
}
function dismiss(object) {
    var imp = calculateImpact(object, false);
    game.removeRequest(object);
    return `Dismissed: <p class = 'object'>${object}</p><p class = 'property'> ${imp[0]}</p>`
}

function calculateImpact(name, sent, missed=false) {
    var br_weight = 0.6;
    var pa_weight = 0.4;
    var we_weight = 0.5;
    var di_weight = 0.3;
    var dh_weight = 0.4;
    var object = game.requests[name];
    var h = 1;
    var c = 40;
    var dh = convertRange(object.distance, [80, 800], [0, 2]);
    var di = convertRange(object.distance, [80, 800], [0.1, 2]);
    var we = convertRange(object.weight, [40, 400], [0.1, 4]);
    var br = 1;
    var pa = 1;
    if (sent) {
        if (object.broken) {br = 1 - br_weight;} else {br = 1 + br_weight;}
        if (object.packaged) {pa = 1 + pa_weight;} else {pa = 1 - pa_weight;}
        c *= (di) + (we);
        h *= (2/dh) * pa * br;
    } else {
        if (missed) {
            c = 40; h = 0.2;
        } else {
            c = 10; h = 0.4;
        }
    }
    game.setMoney(parseInt(-1 * c));
    game.setHappiness(h);
    return [parseInt(-1 * c), h]
}
function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
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
                return `<p>Shipment: </p><p class = 'object'>
                ${object}</p><p> ${attribute}: </p><p class = 'property'>
                ${game.requests[object][attribute]}</p>`;
            } else if (attribute === "all") {
                return `<p>Shipment: </p><p class = 'object'>
                ${object}</p><br> details: <p class = 'property'>
                ${JSON.stringify(game.requests[object])
                    .split(",").join("<br>")
                    .split("{").join("<br>")
                    .split("}").join("")
                    .split('"').join("")}</p>`;
            } else {return "<p class = 'error'>Invalid property</p>"}
        }
    }
    return "<p class = 'error'>Invalid command</p>"
}

function printDisplay(text) {
    document.getElementById("display").innerHTML += "> " + text + "<br>";
}