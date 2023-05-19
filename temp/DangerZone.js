"use strict";
class DangerZone extends Animated {
    constructor(element, jeu, gridX, gridY, width, height, debugShow, maxVelocityX, accelX) {
        console.log(gridX, gridY, width, height);
        super(element, jeu, gridX, gridY);
        this.vx_ = 0;
        this.accelX_ = 0;
        this.maxVelocityX_ = 0.02;
        this.zoneGridWidth_ = width;
        this.zoneGridHeight_ = height;
        this.maxVelocityX_ = maxVelocityX;
        this.accelX_ = accelX;
        this.debugShow(debugShow);
        let zoneLeft = document.createElement("img");
        zoneLeft.style.zIndex = "9";
        this.spriteLeft_ = new GridPositioned(zoneLeft, jeu, gridX - 24, gridY);
        this.spriteLeft_.setImage("img/dangerZone.png", 24 * jeu.step_, height * jeu.step_);
        let zoneRight = document.createElement("img");
        zoneRight.style.zIndex = "9";
        this.spriteRight_ = new GridPositioned(zoneRight, jeu, gridX + width, gridY);
        this.spriteRight_.setImage("img/dangerZone.png", 24 * jeu.step_, height * jeu.step_);
        this.jeu_.appendChild(this);
        this.jeu_.appendChild(this.spriteLeft_);
        this.jeu_.appendChild(this.spriteRight_);
        this.updateVisualPosition();
        this.spriteLeft_.updateVisualPosition();
        this.spriteRight_.updateVisualPosition();
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
        this.spriteLeft_.gridX_ = this.gridX_ - 24;
        this.spriteLeft_.updateVisualPosition();
        this.spriteRight_.gridX_ = this.gridX_ + this.zoneGridWidth_;
        this.spriteRight_.updateVisualPosition();
    }
    debugShow(value) {
        if (value) {
            this.setImage("img/safezonedebug.webp", this.jeu_.step_ * this.zoneGridWidth_, this.jeu_.step_ * this.zoneGridHeight_);
        }
        else {
            this.setImage("img/transparent.png", this.jeu_.step_ * this.zoneGridWidth_, this.jeu_.step_ * this.zoneGridHeight_);
        }
    }
    clearDangerZone() {
        this.jeu_.removeChild(this.spriteLeft_);
        this.jeu_.removeChild(this.spriteRight_);
        this.spriteLeft_ = null;
        this.spriteRight_ = null;
    }
}
