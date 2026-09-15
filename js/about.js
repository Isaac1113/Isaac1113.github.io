const cVButton = document.getElementById("cv-button");
const cvURL = "./data/SoftwareEngineerResume.pdf";

cVButton.addEventListener("click", (event) => {
    window.location.href = cvURL;
});