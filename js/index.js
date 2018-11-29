const myCanvas = document.getElementById('my-canvas');

//conext has all the methods for drawing things
const ctx = myCanvas.getContext('2d');


//global variable
let score = 0;
let isOver = false;


function drawBackground(){
    ctx.fillStyle = 'pink';
    ctx.fillRect(0,0, 1000, 500);

    //add some text
    ctx.fillStyle = 'Green';
    ctx.font = '30px Arial';
    ctx.fillText(`Score: ${score}`, 800 , 50);
}

// drawBackground();
const fireballImg = new Image();
const supermanImg = new Image();

fireballImg.src = './images/fireball.png';
supermanImg.src = './images/superman.png';

let fireballX = 800;
let fireballY = 200;

let supermanX = 0;
let supermanY = 200;

//Use for static objects in canvas
// fireballImg.onload = function(){
//     //
//     ctx.drawImage(fireballImg,fireballX, fireballY, 80, 80);
// }

// supermanImg.onload = function(){
//     //
//     ctx.drawImage(supermanImg, supermanX, supermanY, 150, 150);
// }

//move superman
document.onkeydown = function(event){
    // console.log(event.keyCode);
    switch(event.keyCode){
        case 37:// left
            supermanX -= 10;
            break;
        case 39: // right
            supermanX += 10;
            break;
        case 38: // up
            supermanY -= 10;
            break; 
        case 40: // down
            supermanY += 10;
            break;
    }
}


//animate the canvas
 
function drawingLoop(){
    //erase the whole canvas before drawing again
    ctx.clearRect(0, 0, 1000, 500);

    drawBackground();
    fireballX -= 5;

    if(fireballX < -50){
        fireballX = 1000;
        fireballY = Math.floor(Math.random() * 450);
    }

    drawEverything()

    if(isOver === false){
    //re-draw the whole scene
    requestAnimationFrame(function(){
        //sets up a recursive loop (function calls itself multiple times)
        drawingLoop();
    })
}
}


function drawEverything(){
    ctx.drawImage(fireballImg,fireballX, fireballY, 50, 50);

    ctx.drawImage(supermanImg, supermanX, supermanY, 150, 150);

    if (checkCollision(supermanX,supermanY, fireballX, fireballY)){
        // console.log('crashed!!!')
        gameOver();
    }


    if(fireballX === 0){
        score++;
    }
}

function checkCollision (obj1x, obj1y, obj2x, obj2y){
    //supermanY + superman-height >= fireballY
    return obj1y + 150 - 50 >= obj2y
        //supermanY <= fireballY
        && obj1y <= obj2y + 50
        //supermanX + superman-width
        && obj1x + 150 - 50 >= obj2x
        && obj1x <= obj2x + 50
}

function gameOver(){
    ctx.clearRect(0,0, 1000, 500)
    drawBackground();
    const defeatedSuperman = new Image();
    defeatedSuperman.src = "./images/defeated-superman.jpeg"
    defeatedSuperman.onload = function (){
        ctx.drawImage(defeatedSuperman, 480, 300, 150, 150)
    }
    isOver = true;
    ctx.font = 'bold 70px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText("Game Over", 400, 225);
}



drawingLoop();