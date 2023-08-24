// index.js
import { Square } from './square.js';

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let toggleTrail = false;
let trailPoints = [];
let square;
let lastTimestamp = 0;

function handleKeyPress(event) {
    const key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    } else if (key === " ") { // Barra spaziatrice
        toggleTrail = true;
        square.setCanTrail(!square.getCanTrail());
        if (!square.getCanTrail()) {
            trailPoints = []; // Cancella i punti della scia solo quando disabilitiamo la scia
        }
    }
}

function handleKeyRelease(event) {
    const key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    } else if (key === " ") { // Barra spaziatrice
        toggleTrail = false;
    }
}

function animateSquares(timestamp) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const squares = [];

    square = new Square(50, 50, 50, 50, 2, true, false, 1);
    squares.push(square);

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);

    function updateSquareSpeed() {
        const speed = square.getSpeed();
        let speedX = 0;
        let speedY = 0;

        if (moveLeft) {
            speedX = -speed;
        } else if (moveRight) {
            speedX = speed;
        }

        if (moveUp) {
            speedY = -speed;
        } else if (moveDown) {
            speedY = speed;
        }

        square.setSpeedX(speedX);
        square.setSpeedY(speedY);
    }

    function drawFrame(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!lastTimestamp) lastTimestamp = timestamp;
        const deltaTime = (timestamp - lastTimestamp) / 1000; // Tempo trascorso dall'ultimo frame in secondi

        updateSquareSpeed();

        if (square.getCanTrail()) {
            trailPoints.push({ x: square.getPosX(), y: square.getPosY() });
            square.setTrailOpacity(1);
        } else {
            square.setTrailOpacity(0);
        }

        const trailDuration = square.getTrailDuration();
        if (square.getCanTrail() && square.getTrailOpacity() > 0) {
            square.setTrailOpacity(Math.max(square.getTrailOpacity() - deltaTime / trailDuration, 0));
        }

        ctx.fillStyle = `rgba(0, 0, 255, ${square.getTrailOpacity()})`;
        for (let i = 0; i < trailPoints.length; i++) {
            const point = trailPoints[i];
            ctx.fillRect(point.x, point.y, square.getWidth(), square.getHeight());
        }

        const maxTrailLength = 100;
        if (trailPoints.length > maxTrailLength) {
            trailPoints.shift();
        }

        square.update();

        squares.forEach((square) => {
            square.draw(ctx);
        });

        lastTimestamp = timestamp;
        requestAnimationFrame(drawFrame);
    }

    drawFrame(0);
}

animateSquares();
