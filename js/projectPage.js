const paramsString = window.location.search;
const projSearchParams = new URLSearchParams(paramsString);
let currentProjectNum = projSearchParams.has("projNum") ? projSearchParams.get("projNum") : 0;

const projectBaseURL = "https://raw.githubusercontent.com/Isaac1113/Isaac1113.github.io/refs/heads/main/";
const projectListURL = "https://raw.githubusercontent.com/Isaac1113/Isaac1113.github.io/refs/heads/main/data/projectDataList.json";
let projectDataList;
let projectData;
let currentProjectFileIdx = 0;

const projectInfoContainer = document.querySelector(".project-info-container");

const nextButton = document.querySelector(".next");

const pProj = document.querySelector("main > p");
pProj.textContent += currentProjectNum;

const pTitle = document.querySelector(".p-title");
const pCatAndTech = document.querySelector(".p-cat-and-tech");
const pTime = document.querySelector(".p-time");
const pDescription = document.querySelector(".p-description");
const pContributions = document.querySelector(".p-contributions");

const projectFileList = document.querySelector(".project-file-list");
const fileTitle = document.querySelector(".file-title");


/* Load the YouTube IFrame Player API code asynchronously to control iframe youtube videos in js */
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        events: {
            'onReady': onPlayerReady
        }
    })
};

function onPlayerReady(event) {
    // Need to add border in CSS to see this color
    document.getElementById('player').style.borderColor = '#FF6D00';
    // event.target.playVideo();
}

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

    updatePageData();
}

pageInitialization();

/* populate page with data from project data */
function updatePageData() {
    pTitle.textContent = projectData.name;
    pCatAndTech.textContent = `${projectData.category} (${projectData.technology})`;
    pTime.textContent = projectData.time;
    pDescription.textContent = projectData.description;
    pContributions.textContent = projectData.contribution;

    // load all project videos and images into unordered list
    for (let i = 0; i < projectData.files.length; i++) {
        let elem;

        if (projectData.files[i].type === "video") {
            elem = document.createElement("video");
            elem.controls = true;
        }
        else {
            elem = document.createElement("img");
        }

        elem.src = projectData.files[i].source;

        projectFileList.appendChild(elem);
    }

    updateFileData(0);

    // load youtube iframe video at bottom of page
    const projectIframeURL = `https://www.youtube.com/embed/${projectData.videoID}?enablejsapi=1&mute=1&rel=0`;
    document.getElementById("player").contentWindow.location.replace(projectIframeURL);
}

/* update the specific file info that is displayed when a file image/video is clicked */
function updateFileData(fileIdx) {
    fileTitle.textContent = projectData.files[fileIdx].title;

    // TODO: set the text of all the other file specific elements
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