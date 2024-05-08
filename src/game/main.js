const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 820, 570);

function loadOffice(){
    const image = new Image();
    image.src = '../../public/backdrops/office.png'
}