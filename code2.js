const canvas = document.getElementById('climate-animation');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 400;

let seaLevel = canvas.height - 50;

function drawSea() {
    ctx.fillStyle = '#00f';
    ctx.fillRect(0, seaLevel, canvas.width, canvas.height - seaLevel);
}

function animateSeaLevel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    seaLevel -= 0.5; // Increase this value to speed up the animation
    if (seaLevel < canvas.height - 200) seaLevel = canvas.height - 50; // Reset sea level after certain height
    drawSea();
    requestAnimationFrame(animateSeaLevel);
}

drawSea();
animateSeaLevel();
