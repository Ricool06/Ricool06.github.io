var c = document.getElementById("c");
var ctx = c.getContext("2d");
setInterval(drawloop, 16);

var weatherType = "rain";

function drawloop(){
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,c.width,c.height);
    ctx.closePath();

    if(weatherType == "rain"){
        drawRain();
    }
    if(weatherType == "snow"){
        drawSnow();
    }
}
