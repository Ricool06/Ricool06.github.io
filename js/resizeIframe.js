function receiveMessage(event) {
  resizeIframe();
}

addEventListener("message", receiveMessage, false);

function resizeIframe() {
    var frame = document.getElementById('frame');
    var mainFlex = document.getElementById('mainFlex');
    mainFlex.style.height = '10px'
    mainFlex.style.height = frame.contentWindow.document.body.offsetHeight + 'px';
    console.log("resize");
}
