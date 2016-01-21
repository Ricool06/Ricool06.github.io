var bg = document.getElementById("bgImg");
window.addEventListener("resize", resizeBackground);

var naturalWidth = bg.naturalWidth;
var naturalHeight = bg.naturalHeight;
var ratio = naturalWidth / naturalHeight;

function resizeBackground(){

    if(body.offsetHeight > body.offsetWidth){
        bg.style.height = body.offsetHeight;
        bg.style.width = body.offsetHeight * ratio;
    }
    else{
        bg.style.width = body.offsetWidth;
        bg.style.height = body.offsetWidth / ratio;
    }
}
