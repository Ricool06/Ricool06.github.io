//Get the list of tabs in the header
var headerTabs = document.getElementsByClassName('headerTab');

for (var i = 0; i < headerTabs.length; i++){
    var tab = headerTabs[i];
    tab.addEventListener("click", handleTabClick, false);
}

var lastClickedTab = headerTabs[0];

function handleTabClick(e){
    var tab = e.currentTarget;
    
    lastClickedTab.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    lastClickedTab = tab;

    tab.style.backgroundColor = 'rgba(140,160,160,1)';
}
