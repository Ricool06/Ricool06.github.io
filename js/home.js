var socialBoxes = document.getElementsByClassName("socialBox");
var socialImgs = document.getElementsByClassName("socialImg");
var socialLinks = [
    "https://facepunch.com/member.php?u=460013",
    "https://github.com/Ricool06",
    "https://www.youtube.com/user/ricool06"
];

homeInit();

function homeInit(){
    for(var i = 0; i < socialBoxes.length; i++){
        var socialBox = socialBoxes[i];

        socialBox.link = socialLinks[i];

        socialBox.addEventListener("mouseenter", handleSocialBoxEnter);
        socialBox.addEventListener("mouseleave", handleSocialBoxLeave);
        socialBox.addEventListener("click", handleSocialBoxClick);
    }
}

function handleSocialBoxEnter(e){
    var socialBox = e.currentTarget;

    for(var i = 0; i < socialBoxes.length; i++){
        var socialBoxOther = socialBoxes[i];
        socialBox.style.flexGrow = 1;
    }

    socialBox.style.flexGrow = 3;
}

function handleSocialBoxLeave(e){
    var socialBox = e.currentTarget;
    socialBox.style.flexGrow = 1;
}

function handleSocialBoxClick(e){
    var socialBox = e.currentTarget;
    window.open(socialBox.link);
}
