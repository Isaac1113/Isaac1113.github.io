const paramsString = window.location.search;
const projSearchParams = new URLSearchParams(paramsString);
let currentProjectNum = projSearchParams.has("projNum") ? projSearchParams.get("projNum") : 0;

const projectBaseURL = "https://raw.githubusercontent.com/Isaac1113/Isaac1113.github.io/refs/heads/main/";
const projectListURL = "https://raw.githubusercontent.com/Isaac1113/Isaac1113.github.io/refs/heads/main/data/projectDataList.json";
let projectDataList;
let projectData;
let numFiles = 0;

const projectInfoContainer = document.querySelector(".project-info-container");

const nextButton = document.querySelector(".next");

const pProj = document.querySelector("main > p");
pProj.textContent += currentProjectNum;

const projectFileList = document.querySelector(".project-file-list");


/* initialization to get list of projects in specific order */
async function fetchProjectList() {
    const res = await fetch(projectListURL);
    projectDataList = await res.json();
}

/* get specific project data from the list of projects */
async function fetchProjectFiles(number) {
    const res = await fetch(`${projectBaseURL}${projectDataList[number]}`);
    projectData = await res.json();
}

/* initialization function for page load */
async function pageInitialization() {
    await fetchProjectList();

    await fetchProjectFiles(currentProjectNum);
}

pageInitialization();

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