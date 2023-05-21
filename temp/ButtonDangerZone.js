"use strict";
class ButtonDangerZone extends CenterPositioned {
    constructor(element, jeu, centerX, centerY, newZoneAccelX, newZoneMaxSpeedX) {
        super(element, jeu, centerX, centerY, 1, 1);
        this.newZoneAccelX_ = newZoneAccelX;
        this.newZoneMaxSpeedX_ = newZoneMaxSpeedX;
        this.setImage("img/dirSwap.png", jeu.step_ * this.gridWidth_, jeu.step_ * this.gridHeight_);
        if (newZoneAccelX < 0) {
            this.getElement().style.transform = "scaleX(-1)";
        }
        else if (newZoneAccelX == 0) {
            this.rotateTo(90);
        }
        this.jeu_.appendChild(this);
        this.setVisual();
    }
    trySetNewValuesDangerZone() {
        let wasGoingLeft = this.jeu_.dangerZone_.accelX_ < 0;
        let willGoRight = this.newZoneAccelX_ > 0;
        if (wasGoingLeft == willGoRight) {
            this.jeu_.sfxStormSwapDirection.play();
        }
        this.jeu_.dangerZone_.accelX_ = this.newZoneAccelX_;
        if (this.newZoneMaxSpeedX_ != null) {
            this.jeu_.dangerZone_.maxVelocityX_ = this.newZoneMaxSpeedX_;
        }
    }
}
