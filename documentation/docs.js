function checkResize() {
    if (window.innerWidth < 1000) {
        document.body.width = 100 + "%";
    } else {
        document.body.width = 60 + "%";
    }
}

window.addEventListener("resize", checkResize);
checkResize();