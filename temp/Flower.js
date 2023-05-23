"use strict";
class Flower extends CenterPositioned {
    constructor(element, jeu, centerX, centerY, imgurl, flipimage, canChangeBackground, isBackgroundSpecific, specificBackground, specificForeGround) {
        super(element, jeu, centerX, centerY, 1, 1);
        this.canChangeBackground_ = canChangeBackground;
        this.isbackgroundSpecific_ = isBackgroundSpecific;
        this.specificBackground_ = specificBackground;
        this.specificForeground_ = specificForeGround;
        this.isflipped_ = flipimage;
        this.hasBeenRecolted = false;
        this.setImage(imgurl, jeu.step_ * this.gridWidth_, jeu.step_ * this.gridHeight_);
        if (flipimage) {
            this.getElement().style.transform = "scaleX(-1)";
        }
        this.jeu_.appendChild(this);
        this.setVisual();
    }
    catch() {
        this.jeu_.sfxFlowerRecolted_.play();
        this.jeu_.addLife(0.3);
        this.hasBeenRecolted = true;
        this.tryChangeBackgroundForeground();
    }
    animateRotate() {
        if (this.hasBeenRecolted) {
            if (this.isflipped_) {
                this.rotate(-1);
            }
            else {
                this.rotate(1);
            }
        }
    }
    tryChangeBackgroundForeground() {
        if (this.canChangeBackground_) {
            if (this.isbackgroundSpecific_) {
                console.log("FLOWER isbackgroundSpecific_ NOT IMPLEMENTED YET");
            }
            else {
                if (this.jeu_.currentBackgroundForeground_ < this.jeu_.possibleBackgrounds_.length - 1) {
                    this.jeu_.currentBackgroundForeground_ = this.jeu_.currentBackgroundForeground_ + 1;
                    this.jeu_.setBackground(this.jeu_.possibleBackgrounds_[this.jeu_.currentBackgroundForeground_]);
                    this.jeu_.setForeground(this.jeu_.possibleForegrounds_[this.jeu_.currentBackgroundForeground_]);
                }
                else {
                    console.log("all backgrounds/foreground have been rolled already");
                }
            }
        }
    }
}
