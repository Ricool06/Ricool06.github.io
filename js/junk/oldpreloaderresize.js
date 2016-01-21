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
