// main.js
import { Square } from './square2.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Funzione per disegnare il quadrato
function drawSquare(square) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = square.getColor();
    ctx.fillRect(square.getPosX(), square.getPosY(), square.getWidth(), square.getHeight());
}

// Funzione per disegnare la scia
function drawTrail(square) {
    const trailItems = square.getTrail().getItems();
    const fadeSpeed = square.fadeSpeed;

    ctx.globalAlpha = square.getTrail().getOpacity();
    ctx.fillStyle = square.getColor();

    for (let i = 0; i < trailItems.length; i++) {
        const alpha = (i + 1) * fadeSpeed; // Calcola l'opacità dell'elemento della scia
        ctx.globalAlpha = Math.min(alpha, square.getTrail().getOpacity());
        ctx.fillRect(trailItems[i].x, trailItems[i].y, square.getWidth(), square.getHeight());
    }

    ctx.globalAlpha = 1;
}

let square = null;
const keys = {};

// Funzione per gestire gli eventi della tastiera
function handleKeyPress(event) {
    const key = event.key.toLowerCase();

    switch (key) {
        case 'arrowup':
        case 'arrowdown':
        case 'arrowleft':
        case 'arrowright':
            keys[key] = true;
            break;
        case ' ':
            square.getTrail().toggleEnabled();
            break;
    }
}

function handleKeyRelease(event) {
    const key = event.key.toLowerCase();

    switch (key) {
        case 'arrowup':
        case 'arrowdown':
        case 'arrowleft':
        case 'arrowright':
            keys[key] = false;
            break;
    }
}

// Gestisci gli eventi della tastiera
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyRelease);

// Funzione per aggiornare la posizione del quadrato e della scia
function update() {
    if (square && square.getMove()) {
        const speedX = (keys['arrowright'] ? 1 : 0) - (keys['arrowleft'] ? 1 : 0);
        const speedY = (keys['arrowdown'] ? 1 : 0) - (keys['arrowup'] ? 1 : 0);

        square.setPos(square.getPosX() + speedX, square.getPosY() + speedY);
        square.getTrail().addItem(square.getPosX(), square.getPosY(), { x: speedX, y: speedY });
    }
}

// Ciclo di gioco
function gameLoop() {
    if (!square) {
        const squareWidth = 30;
        const squareHeight = 30;
        const squareColor = 'blue';
        square = new Square(squareWidth, squareHeight, squareColor, canvas.width / 2, canvas.height / 2);
    }

    update();
    drawSquare(square);

    if (square.getTrail().getEnabled()) {
        drawTrail(square);
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();