function updateScroll(){
    var terminal = document.getElementById("display");
    terminal.scrollTop = terminal.scrollHeight;
}
function checkResize() {
    if(window.innerWidth < 1000) {
        document.body.style.width = 80 + "%";
    } else {
        document.body.style.width = 40 + "%";
    }
}
window.addEventListener("resize", checkResize);
checkResize();