const paramsString = window.location.search;
const projSearchParams = new URLSearchParams(paramsString);

const projectInfoContainer = document.querySelector(".project-info-container");

const nextButton = document.querySelector(".next");

const pProj = document.querySelector("main > p");
pProj.textContent += projSearchParams.get("projNum");

nextButton.addEventListener("click", (event) => {
    projectInfoContainer.classList.toggle("leave");
});

projectInfoContainer.addEventListener("animationend", (event) => {
    projectInfoContainer.classList.toggle("leave");
});