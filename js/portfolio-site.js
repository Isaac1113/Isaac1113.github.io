const galleryItems = [
    {videoID: "MhCSIy0RpQ8", title: "Labyrinth of Pushdown Palindrome Level", cover: "img/PDAGame/CoverImage.png"},
    {videoID: "LDJrs22kqb0", title: "Slash Gameplay Tech Demo", cover: "img/Slash/CoverImage.png"},
    {videoID: "TIjEzQFmSDo", title: "Unity Project Beatshot Gameplay", cover: "img/Beatshot/CoverImage.png"},
    {videoID: "sMCxA6FZ1Fc", title: "Impact Miner Full Gameplay", cover: "img/ImpactMiner/CoverImage.png"},
    {videoID: "3Us5JCDH3ag", title: "Ray Tracer Final Animation", cover: "img/RayTracer/CoverImage.png"}
];

const quickViewGallery = document.querySelector(".carousel-gallery");
const hamMenuIcon = document.querySelector(".hamburger-nav");

/* Add event listener to hamburger menu to transition to the open menu */
hamMenuIcon.addEventListener("click", () => {
    // Animate the hamburger menu to be a close button
    for (const child of hamMenuIcon.children) {
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
testBtn.addEventListener("click", () => {
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