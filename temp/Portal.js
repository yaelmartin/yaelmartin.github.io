"use strict";
class Portal extends CenterPositioned {
    constructor(element, jeu, centerX, centerY) {
        super(element, jeu, centerX, centerY, 1.5, 1.5);
        this.visualStatus = 0;
        let element1 = document.createElement("img");
        element1.style.zIndex = "92";
        this.firstLayer_ = new CenterPositioned(element1, jeu, centerX, centerY, 0.9, 0.9);
        this.jeu_.appendChild(this.firstLayer_);
        let element2 = document.createElement("img");
        element2.style.zIndex = "91";
        this.secondLayer_ = new CenterPositioned(element2, jeu, centerX, centerY, 1.2, 1.2);
        this.jeu_.appendChild(this.secondLayer_);
        let element4 = document.createElement("img");
        element4.style.zIndex = "89";
        this.backgroundCosmos_ = new CenterPositioned(element4, jeu, centerX, centerY, 2, 2);
        this.jeu_.appendChild(this.backgroundCosmos_);
        this.setImage("img/SpiralBase3.png", jeu.step_ * this.gridWidth_, jeu.step_ * this.gridHeight_);
        this.jeu_.appendChild(this);
    }
    animationRotate() {
        switch (this.visualStatus) {
            case 1:
                this.rotate(0.7);
                break;
            case 2:
                this.rotate(-1);
                this.secondLayer_.rotate(1);
                break;
            case 3:
                this.rotate(1.5);
                this.secondLayer_.rotate(-1.5);
                this.firstLayer_.rotate(2);
                break;
            case 4:
                this.backgroundCosmos_.rotate(1.5);
                this.rotate(-2);
                this.secondLayer_.rotate(2);
                this.firstLayer_.rotate(-3.5);
                break;
            default:
                break;
        }
    }
    setVisualStatus(value) {
        if (value > this.visualStatus && value < 5) {
            this.visualStatus = value;
            switch (this.visualStatus) {
                case 2:
                    this.secondLayer_.setImage("img/SpiralBase2.png", this.jeu_.step_ * this.secondLayer_.gridWidth_, this.jeu_.step_ * this.secondLayer_.gridHeight_);
                    break;
                case 3:
                    this.firstLayer_.setImage("img/SpiralBase1.png", this.jeu_.step_ * this.firstLayer_.gridWidth_, this.jeu_.step_ * this.firstLayer_.gridHeight_);
                    this.secondLayer_.setImage("img/SpiralBase2.png", this.jeu_.step_ * this.secondLayer_.gridWidth_, this.jeu_.step_ * this.secondLayer_.gridHeight_);
                    break;
                case 4:
                    this.firstLayer_.setImage("img/SpiralBase1.png", this.jeu_.step_ * this.firstLayer_.gridWidth_, this.jeu_.step_ * this.firstLayer_.gridHeight_);
                    this.secondLayer_.setImage("img/SpiralBase2.png", this.jeu_.step_ * this.secondLayer_.gridWidth_, this.jeu_.step_ * this.secondLayer_.gridHeight_);
                    this.backgroundCosmos_.setImage("img/SpiralBase4.png", this.jeu_.step_ * this.backgroundCosmos_.gridWidth_, this.jeu_.step_ * this.backgroundCosmos_.gridHeight_);
                    break;
                default:
                    break;
            }
        }
    }
    clearPortal() {
        this.jeu_.removeChild(this.firstLayer_);
        this.firstLayer_ = null;
        this.jeu_.removeChild(this.secondLayer_);
        this.secondLayer_ = null;
        this.jeu_.removeChild(this.backgroundCosmos_);
        this.backgroundCosmos_ = null;
        this.jeu_.removeChild(this);
    }
}
