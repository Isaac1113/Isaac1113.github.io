const portfolioProjectsDataURL = "https://raw.githubusercontent.com/Isaac1113/Isaac1113.github.io/refs/heads/main/data/portfolioData.json";
const projectListUL = document.querySelector(".project-list");

async function populateProjectList() {
    const res = await fetch(portfolioProjectsDataURL);
    let portfolioProjectArr = await res.json();

    for (const project of portfolioProjectArr) {
        const projContainer = document.createElement("article");
        projContainer.classList.add("section-wrapper");

        const projImg = document.createElement("img");
        projImg.setAttribute("src", project.coverImg);
        projImg.setAttribute("alt", project.title + "cover image");

        const h2Title = document.createElement("h2");
        h2Title.textContent = project.title;

        const h3Time = document.createElement("h3");
        h3Time.textContent = project.time;

        const h3CatAndTech = document.createElement("h3");
        h3CatAndTech.textContent = `${project.category} (${project.technology})`;

        const pDescription = document.createElement("p");
        pDescription.textContent = project.description;

        // TODO: add button and click event to button
        const projButton = document.createElement("button");
        projButton.type = "button";
        projButton.textContent = "Learn More";
        projButton.addEventListener("click", goToProjectPage);

        projContainer.appendChild(projImg);
        projContainer.appendChild(h2Title);
        projContainer.appendChild(h3Time);
        projContainer.appendChild(h3CatAndTech);
        projContainer.appendChild(pDescription);
        projContainer.appendChild(projButton);

        projectListUL.appendChild(projContainer);
    }
}

function goToProjectPage() {
    // TODO: open the project page for the specific project
}

populateProjectList();