"use strict";
class GridPositioned extends Sprite {
    constructor(element, jeu, gridX, gridY) {
        super(element);
        this.jeu_ = jeu;
        this.gridX_ = gridX;
        this.gridY_ = gridY;
    }
    updateVisualPosition() {
        this.setXY(this.jeu_.x0_ + this.gridX_ * this.jeu_.step_, this.jeu_.y0_ + this.gridY_ * this.jeu_.step_);
    }
}
