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
    }
    pause() {
    }
    unpause() {
    }
    clean() {
    }
    SetMusic() {
        this.musicAmbiant1 = new MusicPlayer("m_ambiant1");
        this.musicDead = new MusicPlayer("m_dead");
        this.musicWin = new MusicPlayer("m_win");
    }
    DevInputSystem() {
        this.SetMusic();
        this.benchmark_ = new Benchmark(this);
        this.inputSystem_ = new InputSystem(this);
        this.inputSystem_.startListening();
        this.userInterface_ = new UserInterface(this);
        this.replayCorrectedInputs_ = new Array();
        this.musicAmbiant1.play();
        this.playerIsAlive_ = true;
        this.playerLife_ = 1;
        this.userInterface_.setVisualLife(this.playerLife_);
        this.rawMap_ = new RawMap(1);
        this.drawMap();
        this.loopFrame();
    }
    loopFrame() {
        this.loopOK = setInterval(() => {
            this.idCurrentFrame_ = this.idCurrentFrame_ + 1;
            this.userInterface_.setVisualTimer((this.idCurrentFrame_ / 60).toFixed(2) + "s");
            this.correctedInputs_ = this.inputSystem_.getCorrectedArrowsInputs();
            this.replayCorrectedInputs_.push(this.correctedInputs_);
            this.player_.move();
            this.dangerZone_.move();
            if (!this.checkIfPlayerInSafeArea()) {
                this.playerLife_ = this.playerLife_ - 0.01;
            }
            this.UpdateIsAlive();
            this.inputSystem_.applyReleasedKey();
        }, this.tickRate_);
    }
    UpdateIsAlive() {
        this.userInterface_.setVisualLife(this.playerLife_);
        if (this.playerLife_ < 0) {
            this.playerIsAlive_ = false;
            this.musicDead.play();
            this.playerIsAlive_ = true;
            this.playerLife_ = 1;
        }
    }
    exportReplayInputs() {
        return JSON.stringify(this.replayCorrectedInputs_);
    }
    drawMap() {
        console.log("Jeu.ts drawMap() entered");
        let verticalArrayLength = this.rawMap_.rawGrid_.length;
        let horizontalArrayLength = this.rawMap_.rawGrid_[0].length;
        let elementBackground = document.createElement("img");
        elementBackground.style.zIndex = "0";
        this.background_ = new Sprite(elementBackground);
        this.background_.setImage(this.rawMap_.backgroundImage_[0], horizontalArrayLength * this.step_, verticalArrayLength * this.step_);
        this.background_.setXY(0, 0);
        this.appendChild(this.background_);
        let elementPlayer = document.createElement("img");
        elementPlayer.style.zIndex = "100";
        this.player_ = new Player(elementPlayer, this, this.rawMap_.playerSpawnX_, this.rawMap_.playerSpawnY_, 0.8, 0.8, "img/orange.png");
        let elementZone = document.createElement("img");
        elementZone.style.zIndex = "10";
        this.dangerZone_ = new DangerZone(elementZone, this, this.rawMap_.safeAreaX_, this.rawMap_.safeAreaY_, this.rawMap_.safeAreaWidth_, this.rawMap_.safeAreaHeight_, true, this.rawMap_.safeAreaMaxHorizontalSpeed_, this.rawMap_.safeAreaAccelHorizontalSpeed_);
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
                        element.style.zIndex = "30";
                        let block = new GridPositioned(element, this, j, i);
                        block.setImage("img/purpleblue.png", this.step_, this.step_);
                        block.updateVisualPosition();
                        this.appendChild(block);
                        this.blocks_.push(block);
                        break;
                    }
                    case (7): {
                        let element = document.createElement("img");
                        element.style.zIndex = "30";
                        let button = new GridPositioned(element, this, j, i);
                        button.setImage("img/button.jpg", this.step_, this.step_);
                        button.updateVisualPosition();
                        this.appendChild(button);
                        this.buttons_.push(button);
                        break;
                    }
                    case (8): {
                        let element = document.createElement("img");
                        element.style.zIndex = "30";
                        let flower = new GridPositioned(element, this, j, i);
                        flower.setImage("img/green.png", this.step_, this.step_);
                        flower.updateVisualPosition();
                        this.appendChild(flower);
                        this.flowers_.push(flower);
                        break;
                    }
                    case 9: {
                        let element = document.createElement("img");
                        element.style.zIndex = "30";
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
                        element.style.zIndex = "1000";
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
    checkIfPlayerInSafeArea() {
        return (this.player_.gridX_ >= this.dangerZone_.gridX_ && this.player_.gridX_ + this.player_.playerGridWidth_ < this.dangerZone_.gridX_ + this.dangerZone_.zoneGridWidth_);
    }
}
