const galleryItems = [
    {videoID: "MhCSIy0RpQ8", title: "Labyrinth of Pushdown Palindrome Level", cover: "img/PDAGame/CoverImage.png"},
    {videoID: "LDJrs22kqb0", title: "Slash Gameplay Tech Demo", cover: "img/Slash/CoverImage.png"},
    {videoID: "TIjEzQFmSDo", title: "Unity Project Beatshot Gameplay", cover: "img/Beatshot/CoverImage.png"},
    {videoID: "sMCxA6FZ1Fc", title: "Impact Miner Full Gameplay", cover: "img/ImpactMiner/CoverImage.png"},
    {videoID: "3Us5JCDH3ag", title: "Ray Tracer Final Animation", cover: "img/RayTracer/CoverImage.png"}
];

const quickViewGallery = document.querySelector(".carousel-gallery");
const hamMenuIcon = document.querySelector(".hamburger-nav");

const pName = document.querySelector(".p-name");
const pDescription = document.querySelector(".p-description");
const pCategory = document.querySelector(".p-category");
const pTechAndTime = document.querySelector(".p-tech-and-time");

const quickViewGalleryDataURL = "https://raw.githubusercontent.com/Isaac1113/Isaac1113.github.io/refs/heads/main/data/quickViewGallery.json";
let projectIndex = 0;
let numProjects = 0;
let galleryMaxScrollWidth = quickViewGallery.scrollWidth - quickViewGallery.clientWidth;

const youtubePlayerContainer = document.querySelector(".youtube-player-container");

/* Add event listener to hamburger menu to transition to the open menu */
hamMenuIcon.addEventListener("click", (event) => {
    // Animate the hamburger menu to be a close button
    for (const child of event.target.children) {
        child.classList.toggle("open");
    }

    // Animate the nav menu appearing and come into view for mobile
    const navMenu = document.getElementById("nav-bar");
    navMenu.classList.toggle("open");
});

/* Load the YouTube IFrame Player API code asynchronously to control iframe youtube videos in js */
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIFrameAPIReady() {
    player = new YT.Player("player", {
        events: {
            'onReady': onPlayerReady
        }
    })
};

function onPlayerReady(event) {
    // Need to add border in CSS to see this color
    document.getElementById('player').style.borderColor = '#FF6D00';
    event.target.playVideo();
}

const testBtn = document.querySelector(".test");
testBtn.addEventListener("click", (event) => {
    // TODO: Need to set proper url parameters to disable keyboard, autoplay, etc.
    // TODO: Need to set proper origin domain where js code comes from (I think github pages)
    const newURL = "https://www.youtube.com/embed/LDJrs22kqb0";
    document.getElementById('player').setAttribute('src', newURL);
});

/* Create the img elements from the galleyItems and populate the quick view gallery carousel */
// Add an empty carousel-slide div to the front of the gallery carousel
const frontSlide = document.createElement("div");
frontSlide.classList.add("carousel-slide");
quickViewGallery.appendChild(frontSlide);
for (const item of galleryItems) {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");

    const slideImg = document.createElement("img");
    slideImg.setAttribute("src", item.cover);
    slideImg.setAttribute("alt", item.title + "cover image");

    slide.appendChild(slideImg);

    quickViewGallery.appendChild(slide);
}
// Add an empty carousel-slide div to the end of the gallery carousel
const endSlide = document.createElement("div");
endSlide.classList.add("carousel-slide");
quickViewGallery.appendChild(endSlide);

const leftButton = document.querySelector(".left");
const rightButton = document.querySelector(".right");

leftButton.addEventListener("click", (event) => {
    // First recalculate how much we need to scroll the carousel because display might've been resized
    galleryMaxScrollWidth = quickViewGallery.scrollWidth - quickViewGallery.clientWidth;

    // set project details to new project and move the carousel to the left by one
    if (projectIndex > 0) {
        projectIndex--;
        scrollCarousel(projectIndex);

        quickViewGallery.scrollBy(-galleryMaxScrollWidth / (numProjects - 1), 0);
    }

    if (projectIndex <= 0) {
        // TODO: Gray out the left button if on the first project
        // TODO: Maybe check if button isn't already at first project too so that we don't repeat the graying out
    }
});

rightButton.addEventListener("click", (event) => {
    // First recalculate how much we need to scroll the carousel because display might've been resized
    galleryMaxScrollWidth = quickViewGallery.scrollWidth - quickViewGallery.clientWidth;
    
    // set project details to new project and move the carousel to the right by one
    if (projectIndex < (numProjects - 1)) {
        projectIndex++;
        scrollCarousel(projectIndex);

        quickViewGallery.scrollBy(galleryMaxScrollWidth / (numProjects - 1), 0);
    }

    if (projectIndex >= (numProjects - 1)) {
        // TODO: Gray out the right button if on last project
        // TODO: Maybe check if button isn't already at last project too so that we don't repeat the graying out
    }
});

// populate quick view gallery info based on which item is selected in the quick view carousel
let quickViewGalleryData;
async function scrollCarousel(idx) {
    if (quickViewGalleryData === undefined) {
        const res = await fetch(quickViewGalleryDataURL);
        quickViewGalleryData = await res.json();
        numProjects = quickViewGalleryData.length;
    }
    
    // TODO: Need to set proper origin domain where js code comes from (I think github pages)
    // set the url src of the youtube embedded player to the correct project
    const firstProjectVideoID = quickViewGalleryData[idx].videoID;
    const firstProjectURL = `https://www.youtube.com/embed/${firstProjectVideoID}?enablejsapi=1&autoplay=1&mute=1&controls=0&disablekb=1&rel=0`;
    document.getElementById('player').setAttribute('src', firstProjectURL);

    // set project description that appears when hovering the project
    pName.textContent = quickViewGalleryData[idx].name;
    pDescription.textContent = quickViewGalleryData[idx].description;
    pCategory.textContent = quickViewGalleryData[idx].category;
    pTechAndTime.textContent = `${quickViewGalleryData[idx].technology} (${quickViewGalleryData[idx].time})`;
}

scrollCarousel(0);


youtubePlayerContainer.addEventListener("mouseenter", (event) => {
    console.log("mouseenter");
    const youtubePlayerOverlay = document.querySelector(".youtube-player-overlay");

    youtubePlayerOverlay.classList.toggle("hovered");
});

youtubePlayerContainer.addEventListener("mouseleave", (event) => {
    console.log("mouseleave");
    const youtubePlayerOverlay = document.querySelector(".youtube-player-overlay");

    youtubePlayerOverlay.classList.toggle("hovered");
});

// const myFirstPromise = new Promise((resolve, reject) => {
//     const res = fetch(quickViewGalleryDataURL);
//     res.then((resObj) => {
//         resolve(resObj.json())
//     });
// });

// myFirstPromise.then((quickViewGalleryData) => {
//     pName.textContent = quickViewGalleryData[0].name;
//     pDescription.textContent = quickViewGalleryData[0].description;
//     pCategory.textContent = quickViewGalleryData[0].category;
//     pTechAndTime.textContent = `${quickViewGalleryData[0].technology} (${quickViewGalleryData[0].time})`;
// });