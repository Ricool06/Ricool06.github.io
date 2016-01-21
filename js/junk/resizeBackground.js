var bg = document.getElementById("bgImg");

var naturalWidth = bg.naturalWidth;
var naturalHeight = bg.naturalHeight;
var ratio = naturalWidth / naturalHeight;

window.addEventListener("resize", resizeBackground);

function resizeBackground(){
    if(body.offsetHeight > bg.offsetHeight){
        bg.style.height = body.offsetHeight;
        bg.style.width = body.offsetHeight * ratio;
    }
    else if(body.offsetWidth > bg.offsetWidth){
        bg.style.width = body.offsetWidth;
        bg.style.height = body.offsetWidth / ratio;
    }
}
