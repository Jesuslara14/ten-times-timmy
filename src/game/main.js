const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext("2d");

function loadOffice(){
    let image = new Image();
    image.src = './office.png';

    ctx.drawImage(image, 50, 50);
}

loadOffice();