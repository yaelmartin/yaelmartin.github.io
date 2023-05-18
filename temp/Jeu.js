"use strict";
class Jeu extends Scene {
    constructor(element) {
        super(element, false);
        this.blocks_ = new Array;
        this.flowers_ = new Array;
        this.buttons_ = new Array;
        this.step_ = 32;
        this.idCurrentFrame_ = 0;
        this.tickRate_ = 1000 / 60;
    }
    start() {
        this.DevInputSystem();
    }
    pause() {
    }
    unpause() {
    }
    clean() {
    }
    DevInputSystem() {
        this.benchmark_ = new Benchmark(this);
        this.inputSystem_ = new InputSystem(this);
        this.inputSystem_.startListening();
        this.userInterface_ = new UserInterface(this);
        this.rawMap_ = new RawMap(1);
        this.drawMap();
        this.loopFrame();
    }
    loopFrame() {
        this.loopOK = setInterval(() => {
            this.idCurrentFrame_ = this.idCurrentFrame_ + 1;
            this.userInterface_.setVisualTimer((this.idCurrentFrame_ / 60).toFixed(2) + "s");
            this.correctedInputs = this.inputSystem_.getCorrectedArrowsInputs();
            this.player_.move();
            this.inputSystem_.applyReleasedKey();
        }, this.tickRate_);
    }
    drawMap() {
        console.log("Jeu.ts drawMap() entered");
        let element = document.createElement("img");
        element.style.zIndex = "1";
        this.player_ = new Player(element, this, this.rawMap_.playerSpawnX_, this.rawMap_.playerSpawnY_, 0.8, 0.8, "img/orange.png");
        let verticalArrayLength = this.rawMap_.rawGrid_.length;
        let horizontalArrayLength = this.rawMap_.rawGrid_[0].length;
        this.y0_ = 0;
        this.x0_ = 0;
        for (let i = 0; i < verticalArrayLength; i++) {
            let lineHorizontal = new Array();
            for (let j = 0; j < horizontalArrayLength; j++) {
                let typeCase = this.rawMap_.rawGrid_[i][j];
                switch (typeCase) {
                    case 0: {
                        break;
                    }
                    case 1: {
                        let element = document.createElement("img");
                        let block = new GridPositioned(element, this, j, i);
                        block.setImage("img/purpleblue.png", this.step_, this.step_);
                        block.updateVisualPosition();
                        this.appendChild(block);
                        this.blocks_.push(block);
                        break;
                    }
                    case (7): {
                        let element = document.createElement("img");
                        let button = new GridPositioned(element, this, j, i);
                        button.setImage("img/button.jpg", this.step_, this.step_);
                        button.updateVisualPosition();
                        this.appendChild(button);
                        this.buttons_.push(button);
                        break;
                    }
                    case (8): {
                        let element = document.createElement("img");
                        let flower = new GridPositioned(element, this, j, i);
                        flower.setImage("img/green.png", this.step_, this.step_);
                        flower.updateVisualPosition();
                        this.appendChild(flower);
                        this.flowers_.push(flower);
                        break;
                    }
                    case 9: {
                        let element = document.createElement("img");
                        let flower = new GridPositioned(element, this, j, i);
                        flower.setImage("img/exit.png", this.step_, this.step_);
                        flower.updateVisualPosition();
                        this.appendChild(flower);
                        this.flowers_.push(flower);
                        break;
                    }
                    default: {
                        console.log("value of this case is invalid ! => " + this.rawMap_.rawGrid_[i][j]);
                        let element = document.createElement("img");
                        let invalid = new GridPositioned(element, this, j, i);
                        invalid.setImage("img/missingTexture.webp", this.step_, this.step_);
                        invalid.updateVisualPosition();
                        this.appendChild(invalid);
                        break;
                    }
                }
            }
        }
    }
    getSurroundings(px, py) {
        let surroundings = new Array();
        for (let vertical = 0; vertical < 3; vertical++) {
            let lineHorizontal = new Array();
            for (let horizontal = 0; horizontal < 3; horizontal++) {
                let value;
                try {
                    value = this.rawMap_.rawGrid_[py - 1 + vertical][px - 1 + horizontal];
                }
                catch (error) {
                    value = 1;
                }
                lineHorizontal.push(value);
            }
            surroundings.push(lineHorizontal);
        }
        return surroundings;
    }
    getSurroundings2(px, py) {
        let surroundings = [];
        for (let vertical = 0; vertical < 3; vertical++) {
            let lineHorizontal = [];
            for (let horizontal = 0; horizontal < 3; horizontal++) {
                let value;
                try {
                    value = this.rawMap_.rawGrid_[py - 1 + vertical][px - 1 + horizontal];
                }
                catch (error) {
                    value = 1;
                }
                lineHorizontal.push(value);
            }
            surroundings.push(lineHorizontal);
        }
        return surroundings;
    }
    getSurroundings3(px, py) {
        const surroundings = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        for (let vertical = 0; vertical < 3; vertical++) {
            for (let horizontal = 0; horizontal < 3; horizontal++) {
                let value;
                try {
                    value = this.rawMap_.rawGrid_[py - 1 + vertical][px - 1 + horizontal];
                }
                catch (error) {
                    value = 1;
                }
                surroundings[vertical][horizontal] = value;
            }
        }
        return surroundings;
    }
    getSurroundings4(px, py) {
        const surroundings = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        const rawGrid = this.rawMap_.rawGrid_;
        const gridHeight = rawGrid.length;
        const gridWidth = rawGrid[0].length;
        for (let vertical = 0; vertical < 3; vertical++) {
            for (let horizontal = 0; horizontal < 3; horizontal++) {
                const gridY = py - 1 + vertical;
                const gridX = px - 1 + horizontal;
                let value;
                if (gridY >= 0 && gridY < gridHeight && gridX >= 0 && gridX < gridWidth) {
                    value = rawGrid[gridY][gridX];
                }
                else {
                    value = 1;
                }
                surroundings[vertical][horizontal] = value;
            }
        }
        return surroundings;
    }
}
