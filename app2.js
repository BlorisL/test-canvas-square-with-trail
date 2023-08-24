import data from './canvas.js';

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const keyState = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        Space: false
    };

    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case 'ArrowUp': case 'ArrowDown': case 'ArrowLeft': case 'ArrowRight': keyState[event.key] = true; break;
            case ' ': keyState.Space = !keyState.Space; break;
        }
    });

    document.addEventListener("keyup", function (event) {
        switch (event.key) {
            case 'ArrowUp': case 'ArrowDown': case 'ArrowLeft': case 'ArrowRight': keyState[event.key] = false; break;
        }
    });

    function drawSquare(square) {
        ctx.fillStyle = square.color;
        ctx.fillRect(square.pos.x, square.pos.y, square.width, square.height);
        
        /*if (square.trail.enabled && square.move) {
            console.log(square.trail.enabled, square.move)
            for (let i = 0; i < square.trail.length; i++) {
                ctx.fillStyle = square.trail.color;
                ctx.globalAlpha = square.trail.opacity;
                ctx.fillRect(
                    square.pos.x - i * square.trail.width,
                    square.pos.y - i * square.trail.height,
                    square.width,
                    square.height
                );
                ctx.globalAlpha = 1;
            }
        }*/
    }

    function drawTail(square, pos) {
        if (square.trail.enabled && square.move) {
            ctx.fillStyle = square.trail.color;
            ctx.globalAlpha = square.trail.opacity;
            ctx.fillRect(
                pos.x,
                pos.y,
                100,
                square.trail.height
            );
            ctx.globalAlpha = 1;
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        clearCanvas();

        for(const square of data.squares) {
            
            const pos = square.pos;

            if(square.move) {
                square.speed.top = keyState.ArrowUp ? 1 : 0;
                square.speed.bottom = keyState.ArrowDown ? 1 : 0;
                square.speed.left = keyState.ArrowLeft ? 1 : 0;
                square.speed.right = keyState.ArrowRight ? 1 : 0;

                square.pos.x += square.speed.right - square.speed.left;
                square.pos.y += square.speed.bottom - square.speed.top;

                if (keyState.Space) {
                    square.trail.enabled = !square.trail.enabled;
                }
            }
            drawTail(square, pos);
            drawSquare(square);
        }

        requestAnimationFrame(update);
    }

    update();
});
