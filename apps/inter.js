var game = null;

function startGame() {
    game = null;
    startDisplay();
    game = new Game(600, 1);
    game.setHappiness(1);
    game.setMoney(0);
    game.startLoop();
}
function endGame() {
    game.endLoop();
    game = null;
    endDisplay();
}
function startDisplay() {
    document.getElementById("write").style.display = "block";
    document.getElementById("read").style.display = "none";
    document.getElementById("placeholder").style.display = "none";
    document.getElementById("stats").style.display = "inline-block";
}
function endDisplay() {
    document.getElementById("write").innerHTML = "";
    document.getElementById("write").style.display = "none";
    document.getElementById("read").style.display = "inline";
    document.getElementById("placeholder").style.display = "inline-block";
    document.getElementById("stats").style.display = "none";
}