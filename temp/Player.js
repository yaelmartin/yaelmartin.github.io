"use strict";
class Player extends Animated {
    getCollisionsConsole() {
        this.updateGridCollisionCoords();
        console.log(this.CheckCollisionsDown(), this.CheckCollisionsUp(), this.CheckCollisionsLeft(), this.CheckCollisionsRight());
    }
    move() {
        if (this.devMove == 0) {
            this.moveSimplest();
        }
        if (this.devMove == 1) {
            this.moveHope();
        }
        if (this.devMove == 2) {
            this.moveHope2();
        }
    }
    moveHope2() {
        this.newGridX_ = this.gridX_;
        this.newGridY_ = this.gridY_;
        this.newGridY_ = this.newGridY_ + 0.05;
        this.updateGridCollisionCoords();
        this.grounded_ = this.CheckCollisionsDown();
        this.newGridY_ = this.gridY_;
        let arrowInputs = this.jeu_.correctedInputs_;
        if (this.alwaysJumping) {
            arrowInputs[1] = true;
        }
        else {
            if (!this.allowContinousJumping) {
                if (arrowInputs[1] == this.previousInputs[1]) {
                    arrowInputs[1] = false;
                }
            }
        }
        if (arrowInputs[1] && this.grounded_) {
            this.vy_ = (-0.25);
        }
        if (arrowInputs[2] == arrowInputs[3]) {
            if (this.grounded_) {
                this.vx_ = this.vx_ / 1.8;
            }
            else {
                this.vx_ = this.vx_ / 1.5;
            }
            if (Math.abs(this.vx_) < 0.02) {
                this.vx_ = 0;
            }
        }
        if (arrowInputs[2]) {
            if (this.grounded_) {
                this.vx_ = this.vx_ - 0.05;
            }
            else {
                this.vx_ = this.vx_ - 0.01;
            }
            if (this.vx_ < -this.maxVelocityX_) {
                this.vx_ = (-this.maxVelocityX_);
            }
        }
        if (arrowInputs[3]) {
            if (this.grounded_) {
                this.vx_ = this.vx_ + 0.05;
            }
            else {
                this.vx_ = this.vx_ + 0.01;
            }
            if (Math.abs(this.vx_) > this.maxVelocityX_) {
                this.vx_ = this.maxVelocityX_;
            }
        }
        if (arrowInputs[1] && this.nearWallLeft_ && this.lastTimeWasNearWall && arrowInputs[2] && !this.grounded_) {
            this.lastTimeWasNearWall = false;
            this.vy_ = (-0.3);
            this.vx_ = 0.2;
        }
        if (arrowInputs[1] && this.nearWallRight_ && this.lastTimeWasNearWall && arrowInputs[3] && !this.grounded_) {
            this.lastTimeWasNearWall = false;
            this.vy_ = -0.3;
            this.vx_ = (-0.2);
        }
        this.newGridX_ = this.gridX_ + this.vx_;
        if (this.grounded_) {
            if (this.vy_ <= 0) {
                this.newGridY_ = this.gridY_ + this.vy_;
            }
            else {
                this.vy_ = 0;
            }
        }
        else {
            this.vy_ = this.vy_ + this.gravity_;
            if (this.vy_ > this.fallingMaxVelocityY_) {
                this.vy_ = this.fallingMaxVelocityY_;
            }
            this.newGridY_ = this.gridY_ + this.vy_;
        }
        if (this.vy_ < 0) {
            let tempGridX = this.newGridX_;
            this.newGridX_ = this.gridX_;
            this.updateGridCollisionCoords();
            if (this.CheckCollisionsUp()) {
                this.newGridY_ = Math.floor(this.newGridY_) + 1 + this.pushBack;
                this.vy_ = 0;
            }
            this.newGridX_ = tempGridX;
        }
        if (this.vy_ > 0 && !this.grounded_) {
            let tempGridX = this.newGridX_;
            this.newGridX_ = this.gridX_;
            this.updateGridCollisionCoords();
            if (this.CheckCollisionsDown()) {
                this.newGridY_ = Math.floor(this.newGridY_) + 1 - this.playerGridHeight_ - this.pushBack;
                this.vy_ = 0;
            }
            this.newGridX_ = tempGridX;
        }
        if (this.vx_ < 0) {
            this.updateGridCollisionCoords();
            if (this.CheckCollisionsLeft()) {
                this.vx_ = 0;
                this.newGridX_ = Math.floor(this.newGridX_) + 1 + this.pushBack;
                this.nearWallRight_ = false;
                this.nearWallLeft_ = true;
                this.lastTimeWasNearWall = true;
            }
            else {
                this.nearWallLeft_ = false;
                this.nearWallRight_ = false;
            }
        }
        if (this.vx_ > 0) {
            this.updateGridCollisionCoords();
            if (this.CheckCollisionsRight()) {
                this.vx_ = 0;
                this.newGridX_ = Math.floor(this.newGridX_) + 1 - this.playerGridWidth_ - this.pushBack;
                this.nearWallLeft_ = false;
                this.nearWallRight_ = true;
                this.lastTimeWasNearWall = true;
            }
            else {
                this.nearWallLeft_ = false;
                this.nearWallRight_ = false;
            }
        }
        this.gridX_ = this.newGridX_;
        this.gridY_ = this.newGridY_;
        this.updateVisualPosition();
        this.previousInputs = arrowInputs;
    }
    moveHope() {
        this.newGridX_ = this.gridX_;
        this.newGridY_ = this.gridY_;
        this.getCollisionsConsole();
        this.newGridY_ = this.newGridY_ + 0.05;
        let xCenter = (this.newGridX_ + this.playerGridWidth_ / 2);
        if (xCenter % 1 < 0.5) {
            this.newGridX_ = this.newGridX_ + 0.05;
        }
        else {
            this.newGridX_ = this.newGridX_ - 0.05;
        }
        this.updateGridCollisionCoords();
        this.grounded_ = this.CheckCollisionsDown();
        this.newGridY_ = this.gridY_;
        const arrowInputs = this.jeu_.correctedInputs_;
        if (arrowInputs[1] && this.grounded_ && !this.nearWallLeft_ && !this.nearWallRight_) {
            this.vy_ = (-0.3);
        }
        if (arrowInputs[2] == arrowInputs[3]) {
            if (this.grounded_) {
                this.vx_ = this.vx_ / 1.8;
            }
            else {
                this.vx_ = this.vx_ / 1.5;
            }
            if (Math.abs(this.vx_) < 0.02) {
                this.vx_ = 0;
            }
        }
        if (arrowInputs[2]) {
            if (this.grounded_) {
                this.vx_ = this.vx_ - 0.05;
            }
            else {
                this.vx_ = this.vx_ - 0.01;
            }
            if (this.vx_ < -this.maxVelocityX_) {
                this.vx_ = (-this.maxVelocityX_);
            }
        }
        if (arrowInputs[3]) {
            if (this.grounded_) {
                this.vx_ = this.vx_ + 0.05;
            }
            else {
                this.vx_ = this.vx_ + 0.01;
            }
            if (Math.abs(this.vx_) > this.maxVelocityX_) {
                this.vx_ = this.maxVelocityX_;
            }
        }
        if (arrowInputs[1] && this.nearWallLeft_ && this.lastTimeWasNearWall) {
            this.lastTimeWasNearWall = false;
            this.vy_ = (-0.3);
            this.vx_ = 0.2;
        }
        if (arrowInputs[1] && this.nearWallRight_ && this.lastTimeWasNearWall) {
            this.lastTimeWasNearWall = false;
            this.vy_ = -0.3;
            this.vx_ = (-0.2);
        }
        this.newGridX_ = this.gridX_ + this.vx_;
        if (this.grounded_) {
            if (this.vy_ < 0) {
                this.newGridY_ = this.gridY_ + this.vy_;
            }
        }
        else {
            this.vy_ = this.vy_ + this.gravity_;
            if (this.vy_ > this.fallingMaxVelocityY_) {
                this.vy_ = this.fallingMaxVelocityY_;
            }
            this.newGridY_ = this.gridY_ + this.vy_;
        }
        if (this.vx_ < 0) {
            this.updateGridCollisionCoords();
            if (this.CheckCollisionsLeft()) {
                this.nearWallLeft_ = true;
                this.lastTimeWasNearWall = true;
                this.vx_ = 0;
                this.newGridX_ = Math.floor(this.newGridX_) + 1 + this.pushBack;
            }
            else {
                this.nearWallRight_ = false;
                this.lastTimeWasNearWall = false;
            }
        }
        if (this.vx_ > 0) {
            this.updateGridCollisionCoords();
            if (this.CheckCollisionsRight()) {
                this.nearWallRight_ = true;
                this.lastTimeWasNearWall = true;
                this.vx_ = 0;
                this.newGridX_ = Math.floor(this.newGridX_) + 1 - this.playerGridWidth_ - this.pushBack;
            }
            else {
                this.nearWallLeft_ = false;
                this.lastTimeWasNearWall = false;
            }
        }
        if (this.vy_ < 0) {
            this.updateGridCollisionCoords();
            if (this.CheckCollisionsUp()) {
                this.newGridY_ = Math.floor(this.newGridY_) + 1 + this.pushBack;
                this.vy_ = 0;
                this.nearWallLeft_ = false;
                this.nearWallLeft_ = false;
                this.lastTimeWasNearWall = false;
            }
            else {
                this.grounded_ = false;
            }
        }
        if (this.vy_ > 0 && !this.grounded_) {
            this.updateGridCollisionCoords();
            if (this.CheckCollisionsDown()) {
                this.grounded_ = true;
                this.newGridY_ = Math.floor(this.newGridY_) + 1 - this.playerGridHeight_ - this.pushBack * 100;
                this.vy_ = 0;
            }
        }
        this.gridX_ = this.newGridX_;
        this.gridY_ = this.newGridY_;
        this.updateVisualPosition();
    }
    moveSimplest() {
        const arrowInputs = this.jeu_.correctedInputs_;
        if (arrowInputs[0]) {
            this.down();
        }
        if (arrowInputs[1]) {
            this.up();
        }
        if (arrowInputs[2]) {
            this.left();
        }
        if (arrowInputs[3]) {
            this.right();
        }
    }
    down() {
        this.newGridX_ = this.gridX_;
        this.newGridY_ = this.gridY_ + 0.1;
        this.updateGridCollisionCoords();
        if (this.CheckCollisionsDown()) {
            this.newGridY_ = Math.floor(this.newGridY_) + 1 - this.playerGridHeight_ - this.pushBack;
        }
        this.gridX_ = this.newGridX_;
        this.gridY_ = this.newGridY_;
        this.updateVisualPosition();
    }
    up() {
        this.newGridX_ = this.gridX_;
        this.newGridY_ = this.gridY_ - 0.1;
        this.updateGridCollisionCoords();
        if (this.CheckCollisionsUp()) {
            this.newGridY_ = Math.floor(this.newGridY_) + 1 + this.pushBack;
        }
        this.gridX_ = this.newGridX_;
        this.gridY_ = this.newGridY_;
        this.updateVisualPosition();
    }
    right() {
        this.newGridX_ = this.gridX_ + 0.1;
        this.newGridY_ = this.gridY_;
        this.updateGridCollisionCoords();
        if (this.CheckCollisionsRight()) {
            this.newGridX_ = Math.floor(this.newGridX_) + 1 - this.playerGridWidth_ - this.pushBack;
        }
        this.gridX_ = this.newGridX_;
        this.gridY_ = this.newGridY_;
        this.updateVisualPosition();
    }
    left() {
        this.newGridX_ = this.gridX_ - 0.1;
        this.newGridY_ = this.gridY_;
        this.updateGridCollisionCoords();
        if (this.CheckCollisionsLeft()) {
            this.newGridX_ = Math.floor(this.newGridX_) + 1 + this.pushBack;
        }
        this.gridX_ = this.newGridX_;
        this.gridY_ = this.newGridY_;
        this.updateVisualPosition();
    }
    updateGridCollisionCoords() {
        let xCenter = (this.newGridX_ + this.playerGridWidth_ / 2);
        let yCenter = (this.newGridY_ + this.playerGridHeight_ / 2);
        this.surroundings = this.jeu_.getSurroundings4(Math.floor(xCenter), Math.floor(yCenter));
        xCenter = xCenter % 1;
        yCenter = yCenter % 1;
        this.gridCollisionsX_ = 1 + xCenter - this.playerGridWidth_ / 2;
        this.gridCollisionsY_ = 1 + yCenter - this.playerGridHeight_ / 2;
    }
    CheckCollisionsUp() {
        if (this.gridCollisionsY_ < 1) {
            for (let index = 0; index < 3; index++) {
                if (this.surroundings[0][index] == 1) {
                    if ((this.gridCollisionsX_ + this.playerGridWidth_ > index) && (this.gridCollisionsX_ < index + 1)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    CheckCollisionsDown() {
        if (this.gridCollisionsY_ + this.playerGridHeight_ > 2) {
            for (let index = 0; index < 3; index++) {
                if (this.surroundings[2][index] == 1) {
                    if ((this.gridCollisionsX_ + this.playerGridWidth_ > index) && (this.gridCollisionsX_ < index + 1)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    CheckCollisionsLeft() {
        if (this.gridCollisionsX_ < 1) {
            for (let index = 0; index < 3; index++) {
                if (this.surroundings[index][0] == 1) {
                    if ((this.gridCollisionsY_ + this.playerGridHeight_ > index) && (this.gridCollisionsY_ < index + 1)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    CheckCollisionsRight() {
        if (this.gridCollisionsX_ + this.playerGridWidth_ > 2) {
            for (let index = 0; index < 3; index++) {
                if (this.surroundings[index][2] == 1) {
                    if ((this.gridCollisionsY_ + this.playerGridHeight_ > index) && (this.gridCollisionsY_ < index + 1)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    constructor(element, jeu, gridX, gridY, width, height, imgname) {
        super(element, jeu, gridX, gridY);
        this.vx_ = 0;
        this.vy_ = 0;
        this.gravity_ = 0.02;
        this.maxVelocityX_ = 0.3;
        this.fallingMaxVelocityY_ = 0.3;
        this.pushBack = 0.001;
        this.grounded_ = false;
        this.nearWallLeft_ = false;
        this.nearWallRight_ = false;
        this.lastTimeWasNearWall = false;
        this.previousInputs = [false, false, false, false];
        this.devMove = 2;
        this.playerGridWidth_ = width;
        this.playerGridHeight_ = height;
        this.allowContinousJumping = true;
        this.alwaysJumping = false;
        this.setImage(imgname, this.jeu_.step_ * this.playerGridWidth_, this.jeu_.step_ * this.playerGridHeight_);
        this.updateVisualPosition();
        this.jeu_.appendChild(this);
    }
}
