export class Trail {
    constructor(width, height, color, length = 30, enabled = false, duration = 1, opacity = 1) {
        this.width = width;
        this.height = height;
        this.length = length;
        this.enabled = enabled;
        this.color = color;
        this.duration = duration;
        this.opacity = opacity;
        this.items = [];
    }

    setWidth(width) { this.width = width; return this; }
    getWidth() { return this.width; }

    setHeight(height) { this.height = height; return this; }
    getHeight() { return this.height; }

    setLength(length) { this.length = length; return this; }
    getLength() { return this.length; }

    setEnabled(enabled) { this.enabled = enabled; return this; }
    toggleEnabled() { this.enabled = !this.enabled; return this; }
    getEnabled() { return this.enabled; }
    
    setColor(color) { this.color = color; return this; }
    getColor() { return this.color; }

    setDuration(duration) { this.duration = duration; return this; }
    getDuration() { return this.duration; }

    setOpacity(opacity) { this.opacity = opacity; return this; }
    getOpacity() { return this.opacity; }

    setItems(items) { this.items = items; return this; }
    getItems() { return this.items || []; }

    // Aggiunta del metodo per aggiungere una nuova posizione storica alla traccia
    addItem(x, y, direction) {
        this.items.push({ x, y, direction });
        // Manteniamo solo le ultime 'length' posizioni per ottenere l'effetto di scia
        if (this.items.length > this.getLength()) {
            this.items.shift();
        }
        return this;
    }
}