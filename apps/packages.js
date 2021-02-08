var requests = {
};

const boxNames = ["chickenshipment", "foodbarrel", "letterbox", "metalcargo", "eggs", "winston", "dildoshipment"];

function startGame() {
    makeRequest();
    names = shuffle(boxNames);
}

function makeRequest() {
    addRequest();
}

function addRequest() {
    const name = boxNames.pop();
    
    const distance = (Math.random() * 790) + 10;
    const weight = (Math.random() * 318) + 2;
    var packaged = false;
    var broken = false;
    if (Math.random() > 0.6) {
        packaged = true; 
    }
    if (Math.random() > 0.6) {
        broken = true;
    }
    requests[name] = {
        "weight" : weight,
        "distance" : distance, 
        "broken" : broken, 
        "packaged" : packaged
    };
    printDisplay("New package: " + name + " " + JSON.stringify(requests[name]));
    setTimeout(function() {makeRequest();boxNames.push(name);}, (Math.random() * 16000) + 10000);
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}