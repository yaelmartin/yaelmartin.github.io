"use strict";
class DangerZone extends Animated {
    constructor(element, jeu, gridX, gridY, width, height, debugShow, maxVelocityX, accelX) {
        console.log(gridX, gridY, width, height);
        super(element, jeu, gridX, gridY);
        this.vx_ = 0;
        this.vy_ = 0;
        this.accelX_ = 0;
        this.maxVelocityX_ = 0.02;
        this.maxVelocityY_ = 0.02;
        this.zoneGridWidth_ = width;
        this.zoneGridHeight_ = height;
        this.maxVelocityX_ = maxVelocityX;
        this.accelX_ = accelX;
        this.debugShow(debugShow);
        this.jeu_.appendChild(this);
        this.updateVisualPosition();
    }
    move() {
        this.vx_ = this.vx_ + this.accelX_;
        if (this.vx_ < 0 && Math.abs(this.vx_) > this.maxVelocityX_) {
            this.vx_ = (-this.maxVelocityX_);
        }
        if (this.vx_ > 0 && Math.abs(this.vx_) > this.maxVelocityX_) {
            this.vx_ = this.maxVelocityX_;
        }
        this.gridX_ = this.gridX_ + this.vx_;
        this.updateVisualPosition();
    }
    debugShow(value) {
        if (value) {
            this.setImage("img/safezonedebug.webp", this.jeu_.step_ * this.zoneGridWidth_, this.jeu_.step_ * this.zoneGridHeight_);
        }
        else {
            this.setImage("img/transparent.png", this.jeu_.step_ * this.zoneGridWidth_, this.jeu_.step_ * this.zoneGridHeight_);
        }
    }
}
