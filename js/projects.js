var grid = document.getElementById("projectsGrid");
var projectsXHR = new XMLHttpRequest();
var projectsObj;

preloaderInit();

projectsXHR.onreadystatechange = handleProjectsXHR;
projectsXHR.open("GET","https://api.github.com/users/ricool06/repos", true);
projectsXHR.send();

function handleProjectsXHR(){
    if(projectsXHR.status == 200 && projectsXHR.readyState == 4){
        projectsObj = JSON.parse(projectsXHR.responseText);
        grid.innerHTML = "";
        for(var project of projectsObj){
            var div = document.createElement("div");
            div.className = "projectBox fadeIn small";

            var content = "";
            content = content + "<img class=\"projectImg\" src=\"https://raw.githubusercontent.com/" + project.full_name + "/master/demo.jpg\" width=\"100%\">";
            content = content + "<h2>" + project.name + "</h2>";
            content = content + "<p>" + project.description + "</p>";
            div.addEventListener("click", function(){ window.open(project.html_url); }, false);

            div.innerHTML = content;
            grid.appendChild(div);
        }
    }
}
