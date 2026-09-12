const paramsString = window.location.search;
const projSearchParams = new URLSearchParams(paramsString);

const pProj = document.querySelector("main > p");
pProj.textContent += projSearchParams.get("projNum");