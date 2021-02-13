var money = document.getElementById('money');
var econ = document.getElementById('econ');

function updateScroll(){
    var terminal = document.getElementById("display");
    terminal.scrollTop = terminal.scrollHeight;
}
function checkResize() {
    if(window.innerWidth < 1100) {
        document.body.style.width = 80 + "%";
        money.style.margin = 2 + "px";
        econ.style.margin = 2 + "px";
        money.style.padding = 8 + "px";
        econ.style.padding = 8 + "px";
    } else {
        money.style.margin = 6 + "px";
        econ.style.margin = 6 + "px";
        money.style.padding = 8 + "px";
        econ.style.padding = 8 + "px";
        document.body.style.width = 40 + "%";
    }
    if(window.innerWidth < 500) {
        money.style.display = "block";
        econ.style.display = "block";
    } else {
        money.style.display = "inline";
        econ.style.display = "inline";
    }
}
window.addEventListener("resize", checkResize);
checkResize();
document.getElementById("placeholder").style.display = "inline-block";
document.getElementById("stats").style.display = "none";