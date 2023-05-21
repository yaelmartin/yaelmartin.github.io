"use strict";
class CenterPositioned extends GridPositioned {
    constructor(element, jeu, centerX, centerY, width, height) {
        super(element, jeu, 12, 12);
        this.gridWidth_ = width;
        this.gridHeight_ = height;
        this.centerGridX_ = centerX;
        this.centerGridY_ = centerY;
        this.setVisual();
    }
    setVisualByCenter(x, y) {
        this.centerGridX_ = x;
        this.centerGridY_ = y;
        this.gridX_ = this.centerGridX_ - (this.gridWidth_ / 2);
        this.gridY_ = this.centerGridY_ - (this.gridHeight_ / 2);
        this.updateVisualPosition();
    }
    setVisual() {
        this.setVisualByCenter(this.centerGridX_, this.centerGridY_);
    }
}
