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

var player;
function onYouTubeIFrameAPIReady() {
    player = new YT.Player("player", {
        videoId: 'MhCSIy0RpQ8',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'origin': "https://www.youtube.com"
        },
        events: {
            'onReady': onPlayerReady
        }
    })
};

function onPlayerReady(event) {
    event.target.playVideo();
}