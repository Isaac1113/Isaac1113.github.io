const hamMenuIcon = document.querySelector(".hamburger-nav");

/* Add event listener to hamburger menu to transition to the open menu */
hamMenuIcon.addEventListener("click", (event) => {    
    // Animate the hamburger menu to be a close button
    for (const child of hamMenuIcon.children) {
        child.classList.toggle("open");
    }

    // Animate the nav menu appearing and come into view for mobile
    const navMenu = document.getElementById("nav-bar");
    navMenu.classList.toggle("open");

    if (navMenu.classList.contains("open")) {
        document.body.style.overflow = "hidden";
    }
    else {
        document.body.style.overflow = "auto";
    }
});