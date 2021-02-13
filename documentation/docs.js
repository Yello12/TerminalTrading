function checkResize() {
    if (window.innerWidth < 1000) {
        document.body.style.width = 90 + "%";
    } else {
        document.body.style.width = 60 + "%";
    }
}

window.addEventListener("resize", checkResize);
checkResize();