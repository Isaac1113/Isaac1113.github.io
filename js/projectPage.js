const paramsString = window.location.search;
const projSearchParams = new URLSearchParams(paramsString);

const projectBaseURL = "https://raw.githubusercontent.com/Isaac1113/Isaac1113.github.io/refs/heads/main/";
const projectListURL = "https://raw.githubusercontent.com/Isaac1113/Isaac1113.github.io/refs/heads/main/data/projectDataList.json";
let projectDataList;
let projectData;
let numFiles = 0;

const projectInfoContainer = document.querySelector(".project-info-container");

const nextButton = document.querySelector(".next");

const pProj = document.querySelector("main > p");
// pProj.textContent += projSearchParams.get("projNum");

const projectFileList = document.querySelector(".project-file-list");


/* initialization to get list of projects in specific order */
async function fetchProjectList() {
    const res = await fetch(projectListURL);
    projectDataList = await res.json();
}

/* initialization to get specific project from the list of projects */
async function fetchProjectFiles(number) {
    await fetchProjectList();
    
    const res = await fetch(`${projectBaseURL}${projectDataList[number]}`);
    projectData = await res.json();
}


/* testing leaving and entering animation of data content */
nextButton.addEventListener("click", (event) => {
    projectInfoContainer.classList.toggle("leave");
});
projectInfoContainer.addEventListener("animationend", (event) => {
    if (projectInfoContainer.classList.contains("leave")) {
        projectInfoContainer.classList.toggle("leave");

        projectInfoContainer.classList.toggle("enter");

        // TODO: load the next project data and set all text elements to new project
    }
    else if (projectInfoContainer.classList.contains("enter")) {
        projectInfoContainer.classList.toggle("enter");
    }
});