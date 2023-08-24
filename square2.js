// square.js
import { Trail } from './trail.js';

export class Square {
    constructor(width, height, color, posX = 0, posY = 0, move = true) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.pos = { x: posX, y: posY };
        this.speed = { top: 1, right: 1, bottom: 1, left: 1 };
        this.move = move;
        this.setTrail();
        this.fadeSpeed = 0.02; // Velocità di dissolvenza della scia (puoi modificarla come preferisci)
    }

    setWidth(width) { this.width = width; return this; }
    getWidth() { return this.width; }

    setHeight(height) { this.height = height; return this; }
    getHeight(height) { return this.height; }

    setColor(color) { this.color = color; return this; }
    getColor() { return this.color; }

    setPos(x, y) { this.pos = { x, y }; return this; }
    getPos() { return this.pos; }

    setPosX(x) { this.pos.x = x; return this; }
    getPosX() { return this.pos.x; }

    setPosY(y) { this.pos.y = y; return this; }
    getPosY() { return this.pos.y; }

    decPosY() { this.pos.y -= this.getSpeedTop(); return this; }
    incPosY() { this.pos.y += this.getSpeedBottom(); return this; }

    decPosX() { this.pos.x -= this.getSpeedLeft(); return this; }
    incPosX() { this.pos.x += this.getSpeedRight(); return this; }

    setSpeed(top, right, bottom, left) { this.speed = { top, right, bottom, left }; return this; }
    getSpeed() { this.speed; }

    setSpeedTop(top) { this.speed.top = top; return this; }
    getSpeedTop() { return this.speed.top; }

    setSpeedRight(right) { this.speed.right = right; return this; }
    getSpeedRight() { return this.speed.right; }

    setSpeedBottom(bottom) { this.speed.bottom = bottom; return this; }
    getSpeedBottom() { return this.speed.bottom; }

    setSpeedLeft(left) { this.speed.left = left; return this; }
    getSpeedLeft() { return this.speed.left; }

    setMove(move) { this.move = move; return this; }
    getMove() { return this.move; }

    setTrail(width = undefined, height = undefined, color = undefined, length = undefined, enabled = undefined, duration = undefined, opacity = undefined) {
        this.trail = new Trail(width ?? this.getWidth(), height ?? this.getHeight(), color ?? this.getColor(), length, enabled, duration, opacity);
        return this;
    }

    getTrail() { return this.trail; }
}