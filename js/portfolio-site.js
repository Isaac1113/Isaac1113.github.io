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
            'origin': "https://www.youtube.com",
            'autoplay': 1,
            'rel': 0,
            'disablekb': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    })
};

function onPlayerReady(event) {
    document.getElementById('player').style.borderColor = '#FF6D00';
    event.target.playVideo();
}

const testBtn = document.querySelector(".test");
testBtn.addEventListener("click", () => {
    const newURL = "https://www.youtube.com/embed/LDJrs22kqb0";
    document.getElementById('player').setAttribute('src', newURL);
});