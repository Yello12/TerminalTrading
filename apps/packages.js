var game = null;

function startGame() {
    game = null;
    game = new Game(0, 1);
    game.names = game.shuffle(game.boxNames);
    game.setMoney(600);
    game.setHappiness(1);
    game.addRequest();
    return "Game started!"
}
function endGame() {
    game.end();
    game = null;
    return "Game ended!"
}