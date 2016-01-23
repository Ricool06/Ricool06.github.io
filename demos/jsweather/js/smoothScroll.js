window.addEventListener("wheel", openControl);
var deltaY = 0;
var currentY = 0;
var increment = 0;
var scrollInterval;

function openControl(e){
    clearInterval(scrollInterval);
    e.preventDefault();
    deltaY = e.deltaY;
    increment = deltaY / 20;

    scrollInterval = setInterval(smooth, 16);
}

function smooth(){
    currentY += increment;
    if(Math.abs(currentY) >= Math.abs(deltaY)){
        currentY = 0;
        deltaY = 0;
        increment = 0;
        clearInterval(scrollInterval);
    }
    window.scrollBy(0, increment);
}
