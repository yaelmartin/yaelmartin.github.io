"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Jeu extends Scene {
    SetMusic() {
        this.musicAmbiant1 = new MusicPlayer("m_ambiant1", true);
        this.musicDead = new MusicPlayer("m_dead", false);
        this.musicWin = new MusicPlayer("m_win", false);
    }
    DevInputSystem() {
        this.totalDeaths_ = 0;
        this.SetMusic();
        this.inputSystem_ = new InputSystem(this);
        this.inputSystem_.startListening();
        this.userInterface_ = new UserInterface(this);
        this.loadLevel(this.currentLevel_);
        this.loopFrame();
    }
    loadLevel(level) {
        this.replayCorrectedInputs_ = new Array();
        this.musicAmbiant1.play();
        this.playerIsAlive_ = true;
        this.playerLife_ = 1;
        this.userInterface_.setVisualLife(this.playerLife_);
        this.rawMap_ = new RawMap(1);
        this.drawMap();
    }
    loopFrame() {
        this.loopOK = setInterval(() => {
            if (this.playerIsAlive_) {
                this.idCurrentFrame_ = this.idCurrentFrame_ + 1;
                this.userInterface_.setVisualTimer((this.idCurrentFrame_ / 60).toFixed(2) + "s");
                this.correctedInputs_ = this.inputSystem_.getCorrectedArrowsInputs();
                this.replayCorrectedInputs_.push(this.correctedInputs_);
                this.player_.move();
                this.dangerZone_.move();
                if (!this.checkIfPlayerInSafeArea()) {
                    this.playerLife_ = this.playerLife_ - 0.01;
                }
                this.updatePlayerIsAlive();
                this.inputSystem_.applyReleasedKey();
            }
        }, this.tickRate_);
    }
    distanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    }
    updatePlayerIsAlive() {
        this.userInterface_.setVisualLife(this.playerLife_);
        if (this.playerLife_ < 0) {
            this.totalDeaths_ = this.totalDeaths_ + 1;
            console.log("player died");
            this.playerIsAlive_ = false;
            this.clearLevel();
            this.musicDead.play();
            this.loadLevel(this.currentLevel_);
        }
    }
    updateLevelIsFinished() {
    }
    addLife(value) {
        this.playerLife_ = this.playerLife_ + value;
        if (this.playerLife_ > 1) {
            this.playerLife_ = 1;
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
    setBackground(filepath) {
        this.background_.setImage(filepath, this.horizontalArrayLength * this.step_, this.verticalArrayLength * this.step_);
    }
    setForeground(filepath) {
        this.foreground_.setImage(filepath, this.horizontalArrayLength * this.step_, this.verticalArrayLength * this.step_);
    }
    drawMap() {
        console.log("Jeu.ts drawMap() entered");
        this.verticalArrayLength = this.rawMap_.rawGrid_.length;
        this.horizontalArrayLength = this.rawMap_.rawGrid_[0].length;
        let elementBackground = document.createElement("img");
        elementBackground.style.zIndex = "0";
        this.background_ = new Sprite(elementBackground);
        this.setBackground(this.rawMap_.backgroundImage_[0]);
        this.background_.setXY(0, 0);
        this.appendChild(this.background_);
        let elementForeground = document.createElement("img");
        elementForeground.style.zIndex = "25";
        this.foreground_ = new Sprite(elementForeground);
        this.setForeground(this.rawMap_.foregroundImage_[0]);
        this.foreground_.setXY(0, 0);
        this.appendChild(this.foreground_);
        let elementPlayer = document.createElement("img");
        elementPlayer.style.zIndex = "100";
        this.player_ = new Player(elementPlayer, this, this.rawMap_.playerSpawnX_, this.rawMap_.playerSpawnY_, 0.8, 0.8, "img/yamaegreen.png");
        let elementZone = document.createElement("img");
        elementZone.style.zIndex = "10";
        this.dangerZone_ = new DangerZone(elementZone, this, this.rawMap_.safeAreaX_, this.rawMap_.safeAreaY_, this.rawMap_.safeAreaWidth_, this.rawMap_.safeAreaHeight_, false, this.rawMap_.safeAreaMaxHorizontalSpeed_, this.rawMap_.safeAreaAccelHorizontalSpeed_);
        this.y0_ = 0;
        this.x0_ = 0;
        for (let i = 0; i < this.verticalArrayLength; i++) {
            let lineHorizontal = new Array();
            for (let j = 0; j < this.horizontalArrayLength; j++) {
                let typeCase = this.rawMap_.rawGrid_[i][j];
                switch (typeCase) {
                    case 0: {
                        break;
                    }
                    case 1: {
                        if (this.rawMap_.showBlocks) {
                            let element = document.createElement("img");
                            element.style.zIndex = "30";
                            let block = new GridPositioned(element, this, j, i);
                            block.setImage("img/purpleblue.png", this.step_, this.step_);
                            block.updateVisualPosition();
                            this.appendChild(block);
                            this.blocks_.push(block);
                        }
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
    clearLevel() {
        for (let i = 0; i < this.blocks_.length; i++) {
            let sprite = this.blocks_[i];
            this.removeChild(sprite);
        }
        this.blocks_ = [];
        for (let i = 0; i < this.flowers_.length; i++) {
            let sprite = this.flowers_[i];
            this.removeChild(sprite);
        }
        this.flowers_ = [];
        this.dangerZone_.clearDangerZone();
        this.removeChild(this.dangerZone_);
        this.dangerZone_ = null;
        this.player_.clearPlayer();
        this.removeChild(this.player_);
        this.player_ = null;
    }
    exportReplayInputs() {
        const hexString = this.replayCorrectedInputs_.map(frame => this.convertFrameToHex(frame)).join('');
        const blob = new Blob([hexString], { type: 'text/plain' });
        if ('showSaveFilePicker' in window) {
            window.showSaveFilePicker()
                .then((fileHandle) => __awaiter(this, void 0, void 0, function* () {
                const writable = yield fileHandle.createWritable();
                yield writable.write(blob);
                yield writable.close();
            }))
                .catch((error) => {
                console.error('Failed to save the file:', error);
            });
        }
        else {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'replay.txt';
            downloadLink.click();
        }
    }
    convertFrameToHex(frame) {
        const hexValues = frame.map(value => value ? '1' : '0');
        return parseInt(hexValues.join(''), 2).toString(16);
    }
    importReplayInputs(fileContent) {
        const hexString = fileContent.replace(/\s/g, '');
        const frames = [];
        for (let i = 0; i < hexString.length; i++) {
            const hexChar = hexString[i];
            const decimalValue = parseInt(hexChar, 16);
            const binaryString = decimalValue.toString(2);
            const paddedBinaryString = this.padBinaryString(binaryString, 4);
            const frame = paddedBinaryString.split('').map(bit => bit === '1');
            frames.push(frame);
        }
        return frames;
    }
    padBinaryString(binaryString, length) {
        if (binaryString.length >= length) {
            return binaryString;
        }
        const paddingLength = length - binaryString.length;
        const paddingZeros = '0'.repeat(paddingLength);
        return paddingZeros + binaryString;
    }
    constructor(element) {
        super(element, false);
        this.currentLevel_ = 0;
        this.levelFinished_ = false;
        this.blocks_ = new Array;
        this.flowers_ = new Array;
        this.buttons_ = new Array;
        this.idCurrentFrame_ = 0;
        this.tickRate_ = 1000 / 60;
        this.step_ = 32;
    }
    start() {
        this.listenerKeyStart_ = (event) => {
            if (event.key === "ArrowUp" || event.key === "Up") {
                console.log("Up key is pressed");
                document.removeEventListener("keydown", this.listenerKeyStart_);
                this.DevInputSystem();
            }
        };
        document.addEventListener("keydown", this.listenerKeyStart_);
    }
    pause() {
    }
    unpause() {
    }
    clean() {
    }
}
