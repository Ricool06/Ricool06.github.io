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

var body = document.getElementById("body");
var header = document.getElementById("header");
var footer = document.getElementById("footer");
var canvas = document.getElementById("preloader");

var ctx = canvas.getContext("2d");

window.addEventListener("resize",fitToScreen, false);

var symbol = new Symbol(canvas.width / 2, canvas.height / 2, 0, Math.PI, canvas.height / 4, false, -0.1);
var symbol2 = new Symbol(canvas.width / 2, canvas.height / 2, 0, Math.PI, canvas.height / 6, false, 0.1);

fitToScreen();

setInterval(draw, 16);

function draw(){
    ctx.beginPath();
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.closePath();
    symbol.draw();
    symbol2.draw();
}

function fitToScreen(){
    var newHeight = body.offsetHeight - (footer.offsetHeight + header.offsetHeight + 1);
    var newWidth = body.offsetWidth;

    canvas.style.height = newHeight;
    canvas.height = newHeight;
    canvas.width = newWidth;

    ctx = canvas.getContext("2d");

    symbol = new Symbol(canvas.width / 2, canvas.height / 2, 0, Math.PI, canvas.height / 4, false, -0.1);
    symbol2 = new Symbol(canvas.width / 2, canvas.height / 2, 0, Math.PI, canvas.height / 6, false, 0.1);
}
