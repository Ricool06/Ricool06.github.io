//Get the list of tabs in the header
var headerTabs = document.getElementsByClassName('headerTab');
var mainFlex = document.getElementById('mainFlex');

for (var i = 0; i < headerTabs.length; i++){
    var tab = headerTabs[i];
    tab.addEventListener("click", handleTabClick, false);
}

window.addEventListener('resize', resizeIframe);

var lastClickedTab = headerTabs[0];

var xhr = new XMLHttpRequest();

navigationInit();

function navigationInit(){
    lastClickedTab.style.backgroundColor = 'rgba(179, 229, 252, 1)';
    var content = getNewContent(lastClickedTab);

    changeMainContent(content);
}

function handleTabClick(e){
    var tab = e.currentTarget;
    if(tab != lastClickedTab){
        lastClickedTab.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        lastClickedTab = tab;

        tab.style.backgroundColor = 'rgba(179, 229, 252, 1)';

        var content = "<canvas id=\"preloader\"></canvas>";
        changeMainContent(content);

        preloaderInit();

        content  = getNewContent(tab);
        changeMainContent(content);
    }
}

function changeMainContent(content){
    mainFlex.innerHTML = content;
}

function getNewContent(tab){
    var homeTab = headerTabs[0];
    var projectsTab = headerTabs[1];
    var aboutTab = headerTabs[2];

    var content;

    switch (tab){
        case homeTab:
            content = "<iframe id=\"frame\" src=\"home.html\" scrolling=\"no\" seamless=\"seamless\" onload=\"resizeIframe()\"></iframe>";
            break;
        case projectsTab:
            content = "<iframe id=\"frame\" src=\"projects.html\" scrolling=\"no\" seamless=\"seamless\" onload=\"resizeIframe()\"></iframe>";
            break;
        case aboutTab:
            content = "<iframe id=\"frame\" src=\"about.html\" scrolling=\"no\" seamless=\"seamless\" onload=\"resizeIframe()\"></iframe>";
            break;
    }
    return content;
}
