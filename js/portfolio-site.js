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

// Load the YouTube IFrame Player API code asynchronously to control iframe youtube videos in js
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