const portfolioProjectsDataURL = "https://raw.githubusercontent.com/Isaac1113/Isaac1113.github.io/refs/heads/main/data/portfolioData.json";
const projectListUL = document.querySelector(".project-list");

/* Get project data list from github data, create list cards for each project, and populate the unordered list */
async function populateProjectList() {
    const res = await fetch(portfolioProjectsDataURL);
    let portfolioProjectArr = await res.json();

    for (let i = 0; i < portfolioProjectArr.length; i++) {
        const projContainer = document.createElement("article");
        projContainer.classList.add("section-wrapper");

        const projImg = document.createElement("img");
        projImg.setAttribute("src", portfolioProjectArr[i].coverImg);
        projImg.setAttribute("alt", portfolioProjectArr[i].title + "cover image");

        const h2Title = document.createElement("h2");
        h2Title.textContent = portfolioProjectArr[i].title;

        const h3Time = document.createElement("h3");
        h3Time.textContent = portfolioProjectArr[i].time;

        const h3CatAndTech = document.createElement("h3");
        h3CatAndTech.textContent = `${portfolioProjectArr[i].category} (${portfolioProjectArr[i].technology})`;

        const pDescription = document.createElement("p");
        pDescription.textContent = portfolioProjectArr[i].description;
        pDescription.classList.add("section-info");

        const pDiv = document.createElement("div");
        pDiv.appendChild(h2Title);
        pDiv.appendChild(h3Time);
        pDiv.appendChild(h3CatAndTech);
        pDiv.appendChild(pDescription);
        pDiv.classList.add("project-information");

        // add click event to button that opens project with specific project number
        const projButton = document.createElement("button");
        projButton.type = "button";
        projButton.textContent = "Learn More";
        projButton.addEventListener("click", (event) => {
            goToProjectPage(String(i));
        });

        projContainer.appendChild(projImg);
        projContainer.appendChild(pDiv);
        projContainer.appendChild(projButton);

        projectListUL.appendChild(projContainer);
    }
}

/* Open the project page with a string parameter of the project num at the end of URL */
function goToProjectPage(projNumber) {
    const projURL = new URL("https://isaac1113.github.io/project.html");
    projURL.searchParams.append("projNum", projNumber);

    window.location.href = projURL;
}

populateProjectList();