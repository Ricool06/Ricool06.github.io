//Symbol class
var Symbol = function(x, y, sa, ea, r, cc, speed) {
    this.startAng = sa;
    this.endAng = ea;
    this.x = x;
    this.y = y;
    this.radius = r;
    this.counterClockwise = cc;

    this.rotateSpeed = speed;
}

Symbol.prototype.draw = function(){
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(0,0,0,0.4)";
    ctx.arc(this.x, this.y, this.radius, this.startAng, this.endAng, this.counterClockwise);
    ctx.stroke();
    ctx.closePath();
    this.startAng += this.rotateSpeed;
    this.endAng += this.rotateSpeed;
}
//end class

var body;
var header;
var footer;
var canvas;

var ctx;

var symbol;
var symbol2;

var drawInterval;

preloaderInit();

function preloaderInit(){
    body = document.getElementById("body");
    header = document.getElementById("header");
    footer = document.getElementById("footer");
    canvas = document.getElementById("preloader");

    if(canvas != null){
        ctx = canvas.getContext("2d");

        window.addEventListener("resize",fitToScreen, false);
        fitToScreen();

        symbol = new Symbol(canvas.width / 2, canvas.height / 2, 0, Math.PI, canvas.height / 4, false, -0.1);
        symbol2 = new Symbol(canvas.width / 2, canvas.height / 2, 0, Math.PI, canvas.height / 6, false, 0.1);

        clearInterval(drawInterval);
        drawInterval = setInterval(draw, 16);
    }
}

function draw(){
    if(canvas != null){
        ctx.beginPath();
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.closePath();
        symbol.draw();
        symbol2.draw();
    }
}

function fitToScreen(){
    var newHeight = body.offsetHeight - (footer.offsetHeight + header.offsetHeight + 1);
    var newWidth = body.offsetWidth;

    canvas.style.height = newHeight;
    canvas.height = newHeight;
    canvas.width = newWidth;

    ctx = canvas.getContext("2d");

    symbol = new Symbol(canvas.width / 2, canvas.height / 2, 0, Math.PI, Math.min(canvas.height / 4, canvas.width / 4), false, -0.1);
    symbol2 = new Symbol(canvas.width / 2, canvas.height / 2, 0, Math.PI, Math.min(canvas.height / 6, canvas.width / 6), false, 0.1);
}
