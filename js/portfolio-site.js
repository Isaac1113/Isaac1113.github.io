const quickViewGallery = document.querySelector(".carousel-gallery");

const pName = document.querySelector(".p-name");
const pDescription = document.querySelector(".p-description");
const pCategory = document.querySelector(".p-category");
const pTechAndTime = document.querySelector(".p-tech-and-time");

const quickViewGalleryDataURL = "https://raw.githubusercontent.com/Isaac1113/Isaac1113.github.io/refs/heads/main/data/quickViewGallery.json";
let quickViewGalleryData;
let projectIndex = 0;
let numProjects = 0;
let galleryMaxScrollWidth = quickViewGallery.scrollWidth - quickViewGallery.clientWidth;

const youtubePlayerContainer = document.querySelector(".youtube-player-container");

const leftButton = document.querySelector(".left");
const rightButton = document.querySelector(".right");

const youtubePlayerOverlay = document.querySelector(".youtube-player-overlay");
const arrowContainer = document.querySelector(".arrow-container");

let removingOverlayBool = false;
let initialLoadBool = true;

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

/* Create the img elements from the galleyItems and populate the quick view gallery carousel */
function populateCarouselGallery() {
    // Add an empty carousel-slide div to the front of the gallery carousel
    const frontSlide = document.createElement("div");
    frontSlide.classList.add("carousel-slide");
    quickViewGallery.appendChild(frontSlide);

    for (const item of quickViewGalleryData) {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");

        const slideImg = document.createElement("img");
        slideImg.setAttribute("src", item.coverImg);
        slideImg.setAttribute("alt", item.videoTitle + "cover image");

        slide.appendChild(slideImg);

        quickViewGallery.appendChild(slide);
    }

    // Add an empty carousel-slide div to the end of the gallery carousel
    const endSlide = document.createElement("div");
    endSlide.classList.add("carousel-slide");
    quickViewGallery.appendChild(endSlide);
}

leftButton.addEventListener("click", (event) => {
    // First recalculate how much we need to scroll the carousel because display might've been resized
    galleryMaxScrollWidth = quickViewGallery.scrollWidth - quickViewGallery.clientWidth;

    // set project details to new project, move the carousel to the left by one, and add project details overlay
    if (projectIndex > 0) {
        projectIndex--;
        scrollCarousel(projectIndex);

        quickViewGallery.scrollBy(-galleryMaxScrollWidth / (numProjects - 1), 0);

        addIframeOverlay();
    }
});

rightButton.addEventListener("click", (event) => {
    // First recalculate how much we need to scroll the carousel because display might've been resized
    galleryMaxScrollWidth = quickViewGallery.scrollWidth - quickViewGallery.clientWidth;
    
    // set project details to new project, move the carousel to the right by one, and add project details overlay
    if (projectIndex < (numProjects - 1)) {
        projectIndex++;
        scrollCarousel(projectIndex);

        quickViewGallery.scrollBy(galleryMaxScrollWidth / (numProjects - 1), 0);

        addIframeOverlay();
    }
});

/*  populate quick view gallery info based on which item is selected in the quick view carousel.
    This is also basically working as an initalization function to get the data for the first time.
*/
async function scrollCarousel(idx) {
    // get data from json file for the first time and do inital population of gallery
    if (quickViewGalleryData === undefined) {
        const res = await fetch(quickViewGalleryDataURL);
        quickViewGalleryData = await res.json();
        numProjects = quickViewGalleryData.length;

        populateCarouselGallery();
    }

    // disable the left arrow if on the first project
    if (projectIndex === 0) {
        leftButton.style.visibility = "hidden";
    }
    else {
        leftButton.style.visibility = "visible";
    }

    // disable the right arrow if on the last project
    if (projectIndex === (numProjects - 1)) {
        rightButton.style.visibility = "hidden";
    }
    else {
        rightButton.style.visibility = "visible";
    }

    // don't autoplay on initial load
    let autoplayString = "autoplay=1&";
    if (initialLoadBool) {
        autoplayString = "autoplay=0&";
        initialLoadBool = false;
    }
    
    // TODO: Need to set proper origin domain where js code comes from (I think github pages)
    // set the url src of the youtube embedded player to the correct project
    const firstProjectVideoID = quickViewGalleryData[idx].videoID;
    const firstProjectURL = `https://www.youtube.com/embed/${firstProjectVideoID}?enablejsapi=1&${autoplayString}mute=1&controls=0&disablekb=1&rel=0`;
    document.getElementById('player').setAttribute('src', firstProjectURL);

    // set project description that appears when hovering the project
    pName.textContent = quickViewGalleryData[idx].name;
    pDescription.textContent = quickViewGalleryData[idx].description;
    pCategory.textContent = quickViewGalleryData[idx].category;
    pTechAndTime.textContent = `${quickViewGalleryData[idx].technology} (${quickViewGalleryData[idx].time})`;
}

scrollCarousel(0);

/* reveal the overlay of project info on the iframe when mouse goes over iframe */
youtubePlayerContainer.addEventListener("mouseenter", (event) => {
    addIframeOverlay();
    
    player.playVideo();
});

/* remove the overlay of project info on the iframe when mouse leaves the iframe */
youtubePlayerContainer.addEventListener("mouseleave", (event) => {
    youtubePlayerOverlay.classList.remove("hovered");
    arrowContainer.classList.remove("hovered");

    player.pauseVideo();
});

/* add the project details overlay on the Iframe */
function addIframeOverlay() {
    youtubePlayerOverlay.classList.add("hovered");
    arrowContainer.classList.add("hovered");

    // set a timeout to remove the overlay after 4 seconds so user can see the autoplaying video
    if (!removingOverlayBool) {
        setTimeout(removeIframeOverlay, 4000);

        removingOverlayBool = true;
    }
}

/* remove the project details overlay on the Iframe. This is called after overlay has been shown for some seconds */
function removeIframeOverlay() {
    youtubePlayerOverlay.classList.remove("hovered");
    arrowContainer.classList.remove("hovered");

    removingOverlayBool = false;
}

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