var canvas = document.getElementById("c");
window.addEventListener("resize",resizeCanvas);
resizeCanvas();

function resizeCanvas(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}
