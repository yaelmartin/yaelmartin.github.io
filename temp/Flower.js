"use strict";
class flower extends GridPositioned {
    constructor(element, jeu, gridX, gridY, canChangeBackground, isBackgroundSpecific, specificBackground, specificForeGround) {
        super(element, jeu, gridX, gridY);
        this.canChangeBackground_ = canChangeBackground;
        this.isbackgroundSpecific_ = isBackgroundSpecific;
        this.specificBackground_ = specificBackground;
        this.specificForeground_ = specificForeGround;
        this.hasBeenRecolted = false;
        this.updateVisualPosition();
    }
    catch() {
        this.jeu_.addLife(0.3);
        this.hasBeenRecolted = true;
        this.changeBackgroundForeground();
    }
    changeBackgroundForeground() {
        if (this.canChangeBackground_) {
            if (this.isbackgroundSpecific_) {
            }
            else {
                this.jeu_.currentBackgroundForeground_ = this.jeu_.currentBackgroundForeground_ + 1;
                this.jeu_.setBackground(this.jeu_.possibleBackgrounds_[this.jeu_.currentBackgroundForeground_]);
                this.jeu_.setForeground(this.jeu_.possibleForegrounds_[this.jeu_.currentBackgroundForeground_]);
            }
        }
    }
}
