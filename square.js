// square.js
export class Square {
    constructor(width, height, posX = 0, posY = 0, speed = 1, canMove = true, canTrail = false, trailDuration = 1) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.canMove = canMove;
        this.canTrail = canTrail;
        this.trailDuration = trailDuration;
        this.trailOpacity = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.trailOpacity = 0;
        this.trailDuration = trailDuration;
    }

    setSpeedX(speedX) {
        this.speedX = speedX;
        return this;
    }

    setSpeedY(speedY) {
        this.speedY = speedY;
        return this;
    }

    setWidth(width) {
        this.width = width;
        return this;
    }

    setHeight(height) {
        this.height = height;
        return this;
    }

    setPosX(posX) {
        this.posX = posX;
        return this;
    }

    setPosY(posY) {
        this.posY = posY;
        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setCanMove(canMove) {
        this.canMove = canMove;
        return this;
    }

    setCanTrail(canTrail) {
        this.canTrail = canTrail;
        return this;
    }

    setTrailDuration(trailDuration) {
        this.trailDuration = trailDuration;
        return this;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getSpeed() {
        return this.speed;
    }

    getCanMove() {
        return this.canMove;
    }

    getCanTrail() {
        return this.canTrail;
    }

    getTrailDuration() {
        return this.trailDuration;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setTrailOpacity(opacity) {
        this.trailOpacity = opacity;
    }

    getTrailOpacity() {
        return this.trailOpacity;
    }

    setTrailDuration(duration) {
        this.trailDuration = duration;
    }

    getTrailDuration() {
        return this.trailDuration;
    }

    draw(ctx) {
        if (this.getCanTrail() && this.trailOpacity > 0) {
            ctx.fillStyle = `rgba(0, 0, 255, ${this.trailOpacity})`;
            ctx.fillRect(this.posX, this.posY, this.width, this.height);
        }

        ctx.beginPath();
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.canMove) {
            this.posX += this.speedX;
            this.posY += this.speedY;
        }

        if (this.getCanTrail() && this.trailDuration > 0) {
            const trailFadeSpeed = 1 / (this.trailDuration * 60); // Assumendo 60 FPS
            this.trailOpacity = Math.max(this.trailOpacity - trailFadeSpeed, 0);
        }
    }
}
