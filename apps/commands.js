var money = 0;
var lives = 4;

function registerCommand(key) {
    if (key === 13) {
        command(document.getElementById("input").value);
    }
}

function command(text) {
    var command = parse(text.toLowerCase());
    printDisplay(command);
    updateScroll();
    document.getElementById("input").value = "";
}

function fix(object) {
    if (requests[object]["broken"] === false) {
        return object + " already fixed";
    } else {
        requests[object]["broken"] = false;
        return object + " is no longer broken";
    }
}
function package(object) {
    if (requests[object]["packaged"] === false) {
        return object + " already packaged";
    } else {
        requests[object]["packaged"] = false;
        return object + " is no longer unpacked";
    }
}
function parse(text) {
    var an = text.split(".");
    var object = an[0];
    if (an.length > 1) {
        if (object in requests) {
            // MULTI WORD COMMANDS
            var attribute = an[1];
            if (attribute.endsWith("()") === true) {              
                //FUNCTION
                if (attribute === "fix()") {
                    return fix(object);
                } else if (attribute === "package()") {
                    return package(object);
                } else {return "Invalid function"}
            } else {
                //PROPERTY
                if (attribute in requests[object]) {
                    return "Shipment: " + object + " " + attribute + ": " + requests[object][attribute];
                } else {return "Invalid property"}
            }
        }
    } else {
        // SINGLE WORD COMMANDS
        if (object === "help") {
            //ASKING FOR HELP
            return "Help message goes here"
        } else if (object in requests) {
            //ASKING FOR FULL REQUEST INFORMATION
            return JSON.stringify(requests[object]);
        } else if (object === "start") {
            startGame();
            return "Game started"
        }
    }
    return "invalid command"
}

function printDisplay(text) {
    document.getElementById("display").innerHTML += "> " + text + "<br><br>";
}