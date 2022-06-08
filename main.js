
let canvas;
let canvasContext;
window.onload = function() {
    canvas = document.getElementById('mycanvas');
    canvasContext = canvas.getContext('2d');
    setup_coppering_spoon();
    setup_eletrolysis();
}
