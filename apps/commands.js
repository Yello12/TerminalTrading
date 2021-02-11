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

}
function package(object) {

}
function send(object) {

}
function dismiss(object) {

}
function cost(amt) {

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
        // an = text.split("(");
        // if (an.length > 1) {
        //     object = an[1].replace(")", "");
        // switch (an[0]) {
        // case "fix":
        //     return fix(object);
        // case "package":
        //     return package(object);
        // case "send":
        //     return send(object);
        // case "dismiss":
        //     return dismiss(object);
        // case "cost":
        //     return cost(object);
        // default:
        //     return "<p class = 'red'>Invalid function</p>"
        // }}
    } return "<p class = 'red'>Invalid command</p>"
}

function printDisplay(text) {
    document.getElementById("write").innerHTML += "> " + text + "<br>";
}