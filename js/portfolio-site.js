const hamMenuIcon = document.querySelector(".hamburger-nav");

hamMenuIcon.addEventListener("click", () => {
    // Animate the hamburger menu to be an close button
    for (const child of hamMenuIcon.children) {
        child.classList.toggle("open");
    }

    // Animate the nav menu appearing and comint into view for mobile
    const navMenu = document.getElementById("nav-bar");
    navMenu.classList.toggle("open");
});