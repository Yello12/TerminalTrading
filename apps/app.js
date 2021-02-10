var lives = document.getElementById('lives');
var money = document.getElementById('money');
var econ = document.getElementById('econ');

function updateScroll(){
    var terminal = document.getElementById("display");
    terminal.scrollTop = terminal.scrollHeight;
}
function checkResize() {
    if(window.innerWidth < 1100) {
        document.body.style.width = 80 + "%";
        lives.style.margin = 2 + "px";
        money.style.margin = 2 + "px";
        econ.style.margin = 2 + "px";
        lives.style.padding = 8 + "px";
        money.style.padding = 8 + "px";
        econ.style.padding = 8 + "px";
    } else {
        lives.style.margin = 6 + "px";
        money.style.margin = 6 + "px";
        econ.style.margin = 6 + "px";
        lives.style.padding = 8 + "px";
        money.style.padding = 8 + "px";
        econ.style.padding = 8 + "px";
        document.body.style.width = 40 + "%";
    }
    if(window.innerWidth < 500) {
        lives.style.display = "block";
        money.style.display = "block";
        econ.style.display = "block";
    } else {
        lives.style.display = "inline";
        money.style.display = "inline";
        econ.style.display = "inline";
    }
}
window.addEventListener("resize", checkResize);
checkResize();