var buttons = document.getElementsByClassName("weatherButton");

var br = 0;
var bb = 255;

var shadeIncrement = Math.round(255 / buttons.length);

var clickedButton = buttons[0];

for(var i = 0; i < buttons.length; i++){
    buttons[i].style.backgroundColor = "rgba(" + br + ", 120, " + bb + ", 0.4)";
    buttons[i].plainColor = buttons[i].style.backgroundColor;
    buttons[i].addEventListener("mouseleave", leaveColor);
    buttons[i].addEventListener("mouseenter", enterColor);
    buttons[i].addEventListener("click", changeWeatherType);

    br = br + shadeIncrement;
    bb = bb - shadeIncrement;
}

clickedButton.style.backgroundColor = "rgba(120,220,120,0.5)";

function changeWeatherType(e) {
    var button = e.currentTarget;
    weatherType = button.innerHTML.toLowerCase();

    clickedButton.style.backgroundColor = clickedButton.plainColor;

    clickedButton = e.currentTarget;
    clickedButton.style.backgroundColor = "rgba(120,220,120,0.5)";
}

function enterColor(e){
    if(e.currentTarget != clickedButton){
        e.currentTarget.style.backgroundColor = "rgba(100,220,100,0.5)";
    }
}

function leaveColor(e){
    if(e.currentTarget != clickedButton){
        e.currentTarget.style.backgroundColor = e.currentTarget.plainColor;
    }
}
