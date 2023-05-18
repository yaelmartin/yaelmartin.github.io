"use strict";
class UserInterface {
    constructor(jeu) {
        this.jeu_ = jeu;
        this.background_ = new Sprite(document.createElement("img"));
        this.background_.setXY(0, 384);
        this.background_.setImage("img/marbre.jpg", 640, 96);
        this.jeu_.appendChild(this.background_);
        this.lifeBackgroundBox_ = new Sprite(document.createElement("img"));
        this.lifeBackgroundBox_.setXY(32, 384 + 16);
        this.lifeBackgroundBox_.setImage("img/backgroundLife.png", 128, 64);
        this.jeu_.appendChild(this.lifeBackgroundBox_);
        this.lifeCurrentBox_ = new Sprite(document.createElement("img"));
        this.lifeCurrentBox_.setXY(32, 384 + 16);
        this.lifeCurrentBox_.setImage("img/currentLife.png", 32, 64);
        this.jeu_.appendChild(this.lifeCurrentBox_);
        this.timerBox_ = new Sprite(document.createElement("div"));
        this.timerBox_.setWidth(150);
        this.timerBox_.setHeight(32);
        this.timerBox_.setXY(640 - 150 - 16, 480 - 16 - 32);
        this.timerBox_.getElement().innerHTML = "27878.s";
        this.timerBox_.getElement().style.fontFamily = 'pixel';
        this.timerBox_.getElement().style.fontSize = "30px";
        this.timerBox_.getElement().style.textAlign = "right";
        this.jeu_.appendChild(this.timerBox_);
    }
    setVisualLife(value) {
        this.lifeCurrentBox_.setWidth(this.lifeBackgroundBox_.getWidth() * value);
    }
    clearFlowers() {
    }
    setVisualTimer(text) {
        this.timerBox_.getElement().innerHTML = text;
    }
}
