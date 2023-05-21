"use strict";
class UserInterface {
    constructor(jeu) {
        this.defaultZIndex_ = 120;
        this.jeu_ = jeu;
        let elementBackground = document.createElement("img");
        elementBackground.style.zIndex = "" + (this.defaultZIndex_);
        this.background_ = new Sprite(elementBackground);
        this.background_.setXY(0, 384);
        this.background_.setImage("img/marbre.jpg", 640, 96);
        this.jeu_.appendChild(this.background_);
        let elementLifeBackgroundBox = document.createElement("img");
        elementLifeBackgroundBox.style.zIndex = "" + (this.defaultZIndex_ + 1);
        this.lifeBackgroundBox_ = new Sprite(elementLifeBackgroundBox);
        this.lifeBackgroundBox_.setXY(32, 384 + 16);
        this.lifeBackgroundBox_.setImage("img/backgroundLife.png", 256, 64);
        this.jeu_.appendChild(this.lifeBackgroundBox_);
        let elementLifeCurrentBox = document.createElement("img");
        elementLifeCurrentBox.style.zIndex = "" + (this.defaultZIndex_ + 2);
        this.lifeCurrentBox_ = new Sprite(elementLifeCurrentBox);
        this.lifeCurrentBox_.setXY(32, 384 + 16);
        this.lifeCurrentBox_.setImage("img/currentLife.png", 32, 64);
        this.jeu_.appendChild(this.lifeCurrentBox_);
        let elementTimerBox = document.createElement("div");
        elementTimerBox.style.zIndex = "" + (this.defaultZIndex_ + 1);
        this.timerBox_ = new Sprite(elementTimerBox);
        this.timerBox_.setWidth(150);
        this.timerBox_.setHeight(32);
        this.timerBox_.setXY(640 - 150 - 16, 480 - 16 - 32);
        this.timerBox_.getElement().innerHTML = "0.s";
        this.timerBox_.getElement().style.fontFamily = 'pixel';
        this.timerBox_.getElement().style.fontSize = "30px";
        this.timerBox_.getElement().style.textAlign = "right";
        this.jeu_.appendChild(this.timerBox_);
        let elementFlowerBox = document.createElement("div");
        elementFlowerBox.style.zIndex = "" + (this.defaultZIndex_ + 1);
        this.flowerBox_ = new Sprite(elementFlowerBox);
        this.flowerBox_.setWidth(250);
        this.flowerBox_.setHeight(32);
        this.flowerBox_.setXY(640 - 350, 480 - 100);
        this.flowerBox_.getElement().innerHTML = "Required : 0/0";
        this.flowerBox_.getElement().style.fontFamily = 'pixel';
        this.flowerBox_.getElement().style.fontSize = "25px";
        this.flowerBox_.getElement().style.textAlign = "left";
        this.jeu_.appendChild(this.flowerBox_);
    }
    setVisualLife(value) {
        let newWidth = this.lifeBackgroundBox_.getWidth() * value;
        if (newWidth < 0) {
            newWidth = 0;
        }
        this.lifeCurrentBox_.setWidth(newWidth);
    }
    clearFlowers() {
    }
    setVisualTimer(text) {
        this.timerBox_.getElement().innerHTML = text;
    }
    setFlowerBox(currentFlowers, required) {
        if (currentFlowers == null) {
            this.flowerBox_.getElement().innerHTML = "";
        }
        else {
            this.flowerBox_.getElement().innerHTML = "Required " + currentFlowers + "/" + required;
        }
    }
}
