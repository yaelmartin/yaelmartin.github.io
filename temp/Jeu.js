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
        this.musicAmbiant1_ = new MusicPlayer("m_ambiant1", true);
        this.musicStart_ = new MusicPlayer("m_start", true);
        this.musicDead_ = new MusicPlayer("m_dead", false);
        this.musicWin_ = new MusicPlayer("m_win", false);
        this.musicEnding_ = new MusicPlayer("m_ending", true);
        this.musicDanger_ = new MusicPlayer("m_danger", true);
        this.sfxJump_ = new MusicPlayer("s_jump", false);
        this.sfxWood_ = new MusicPlayer("s_wood", false);
        this.sfxRolling_ = new MusicPlayer("s_rolling", true);
        this.sfxAirSpeed_ = new MusicPlayer("s_airspeed", false);
        this.sfxPortalTeleport_ = new MusicPlayer("s_portalteleport", false);
        this.sfxStorm_ = new MusicPlayer("s_storm", true);
        this.sfxStormSwapDirection = new MusicPlayer("s_stormswap", false);
        this.sfxFlowerRecolted_ = new MusicPlayer("s_flowerrecolted", false);
    }
    useMusicLevel() {
        if (this.rawMap_.music_ == null) {
            if (this.currentMusicPlayerLevel_ != null) {
                this.currentMusicPlayerLevel_.volume(1);
            }
        }
        else {
            if (this.currentMusicName_ != this.rawMap_.music_) {
                if (this.currentMusicPlayerLevel_ != null) {
                    this.currentMusicPlayerLevel_.pause();
                }
                this.currentMusicName_ = this.rawMap_.music_;
                switch (this.currentMusicName_) {
                    case "zen_garden":
                        this.currentMusicPlayerLevel_ = this.musicStart_;
                        this.currentMusicPlayerLevel_.volume(1);
                        this.currentMusicPlayerLevel_.play();
                        break;
                    case "punchy":
                        this.currentMusicPlayerLevel_ = this.musicAmbiant1_;
                        this.currentMusicPlayerLevel_.volume(1);
                        this.currentMusicPlayerLevel_.playAt(0);
                        break;
                    case "danger":
                        this.currentMusicPlayerLevel_ = this.musicDanger_;
                        this.currentMusicPlayerLevel_.volume(1);
                        this.currentMusicPlayerLevel_.play();
                        break;
                    case "ending_scene":
                        this.currentMusicPlayerLevel_ = this.musicEnding_;
                        this.currentMusicPlayerLevel_.volume(1);
                        this.currentMusicPlayerLevel_.play();
                        break;
                    default:
                        console.log("this music isn't valid ! " + this.currentMusicName_);
                        this.currentMusicPlayerLevel_ = null;
                        this.currentMusicName_ = null;
                        break;
                }
            }
        }
    }
    DevInputSystem() {
        this.SetMusic();
        this.inputSystem_ = new InputSystem(this);
        this.inputSystem_.startListening();
        this.userInterface_ = new UserInterface(this);
        let elementForeground = document.createElement("img");
        elementForeground.style.zIndex = "25";
        this.foreground_ = new Sprite(elementForeground);
        this.foreground_.setXY(0, 0);
        this.appendChild(this.foreground_);
        let elementBackground = document.createElement("img");
        elementBackground.style.zIndex = "0";
        this.background_ = new Sprite(elementBackground);
        this.background_.setXY(0, 0);
        this.appendChild(this.background_);
        this.resetWholeGameValues();
        this.loadLevel(this.currentLevel_);
        this.loopFrame();
    }
    resetWholeGameValues() {
        this.currentMusicName_ = null;
        if (this.currentMusicPlayerLevel_ != null) {
            this.currentMusicPlayerLevel_.pause();
        }
        this.currentMusicPlayerLevel_ = null;
        this.gameFinished_ = false;
        this.nbFramesPerLevel = [];
        this.idCurrentFrameLevel_ = 0;
        this.currentLevel_ = 0;
        this.totalDeaths_ = 0;
        this.currentLevel_ = 0;
    }
    loadLevel(level) {
        if (this.currentLevel_ > this.levelLists_.length - 1) {
            this.loadEnding();
        }
        else {
            this.resetVarForLevelLoad();
            this.rawMap_ = new RawMap(this.levelLists_[this.currentLevel_]);
            this.useMusicLevel();
            this.loadMapAndInitializeLogic();
        }
    }
    resetVarForLevelLoad() {
        this.replayCorrectedInputs_ = new Array();
        this.currentBackgroundForeground_ = 0;
        this.levelFinished_ = false;
        this.nbFlowersRecolted_ = 0;
        this.levelFinished_ = false;
        this.portalIsOpened_ = false;
        this.damageVelocity_ = 0;
        this.playerIsAlive_ = true;
        this.userInterface_.setVisualLife(this.playerLife_);
    }
    loopFrame() {
        this.loopOK = setInterval(() => {
            if (!this.levelFinished_) {
                this.idCurrentFrameLevel_ = this.idCurrentFrameLevel_ + 1;
                this.userInterface_.setVisualTimer((this.idCurrentFrameLevel_ / 60).toFixed(2) + "s");
                this.correctedInputs_ = this.inputSystem_.getCorrectedArrowsInputs();
                this.replayCorrectedInputs_.push(this.correctedInputs_);
                this.player_.move();
                this.updatePlayerCenterCoordinates();
                this.tryActionButton();
                this.tryCatchFlowers();
                this.dangerZone_.move();
                this.portal_.animationRotate();
                this.flowersAnimation();
                if (!this.checkIfPlayerInSafeArea()) {
                    this.playerLife_ = this.playerLife_ - this.damageVelocity_;
                }
                this.updatePortalStatus();
                this.chechIfPlayerIsStillAlive();
                this.updateLevelIsFinished();
                this.inputSystem_.applyReleasedKey();
            }
            else {
                if (this.gameFinished_) {
                    console.log("Restarting game");
                    this.userInterface_.setEndingUI(false);
                    this.clearLevel();
                    this.resetWholeGameValues();
                    this.loadLevel(this.currentLevel_);
                }
                else {
                    console.log("level finished");
                    this.nbFramesPerLevel.push(this.idCurrentFrameLevel_);
                    this.idCurrentFrameLevel_ = 0;
                    this.clearLevel();
                    this.currentLevel_ = this.currentLevel_ + 1;
                    this.loadLevel(this.currentLevel_);
                }
            }
        }, this.tickRate_);
    }
    loadEnding() {
        this.gameFinished_ = true;
        console.log("GG YOU FINISHED");
        this.resetVarForLevelLoad();
        this.rawMap_ = new RawMap("ending_scene");
        this.useMusicLevel();
        this.loadMapAndInitializeLogic();
        this.userInterface_.setEndingUI(true);
    }
    distanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    }
    distanceBetweenPointsIslessThan(x1, y1, x2, y2, value) {
        return (Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)) < Math.pow(value, 2);
    }
    chechIfPlayerIsStillAlive() {
        this.userInterface_.setVisualLife(this.playerLife_);
        if (this.playerLife_ < 0) {
            this.totalDeaths_ = this.totalDeaths_ + 1;
            console.log("player died");
            this.playerIsAlive_ = false;
            this.clearLevel();
            this.musicDead_.play();
            this.loadLevel(this.currentLevel_);
        }
    }
    updatePlayerCenterCoordinates() {
        this.playerCenterX_ = this.player_.gridX_ + (this.player_.playerGridWidth_ / 2);
        this.playerCenterY_ = this.player_.gridY_ + (this.player_.playerGridHeight_ / 2);
    }
    updatePortalStatus() {
        if (!this.portalIsOpened_) {
            if (this.flowersToOpenPortal_ <= this.nbFlowersRecolted_) {
                console.log("opening portal");
                this.portalIsOpened_ = true;
                this.sfxPortalTeleport_.play();
                this.portal_.setVisualStatus(4);
            }
        }
    }
    updateLevelIsFinished() {
        if (this.portalIsOpened_) {
            if (this.distanceBetweenPointsIslessThan(this.playerCenterX_, this.playerCenterY_, this.portal_.centerGridX_, this.portal_.centerGridY_, 0.8)) {
                this.sfxPortalTeleport_.play();
                this.levelFinished_ = true;
            }
        }
    }
    flowersAnimation() {
        for (let i = 0; i < this.flowers_.length; i++) {
            this.flowers_[i].animateRotate();
        }
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
        let safe = this.player_.gridX_ >= this.dangerZone_.gridX_ && this.player_.gridX_ + this.player_.playerGridWidth_ < this.dangerZone_.gridX_ + this.dangerZone_.zoneGridWidth_;
        if (safe) {
            this.sfxStorm_.pause();
            if (this.currentMusicPlayerLevel_ != null) {
                this.currentMusicPlayerLevel_.volume(1);
            }
            this.damageVelocity_ = 0;
        }
        else {
            this.sfxStorm_.play();
            if (this.currentMusicPlayerLevel_ != null) {
                this.currentMusicPlayerLevel_.volume(0.3);
            }
            this.damageVelocity_ = this.damageVelocity_ + 0.0005;
        }
        return (safe);
    }
    tryCatchFlowers() {
        for (let i = 0; i < this.flowers_.length; i++) {
            let flower = this.flowers_[i];
            if (!flower.hasBeenRecolted) {
                if (this.distanceBetweenPointsIslessThan(this.playerCenterX_, this.playerCenterY_, flower.centerGridX_, flower.centerGridY_, 0.8)) {
                    flower.catch();
                    this.nbFlowersRecolted_ = this.nbFlowersRecolted_ + 1;
                    let percentFlower = this.nbFlowersRecolted_ / this.flowersToOpenPortal_;
                    this.portal_.setVisualStatus(Math.floor(percentFlower * 4));
                    this.userInterface_.setFlowerBox(this.nbFlowersRecolted_, this.flowersToOpenPortal_);
                }
            }
        }
    }
    tryActionButton() {
        for (let i = 0; i < this.buttons_.length; i++) {
            let button = this.buttons_[i];
            if (this.distanceBetweenPointsIslessThan(this.playerCenterX_, this.playerCenterY_, button.centerGridX_, button.centerGridY_, 0.8)) {
                button.trySetNewValuesDangerZone();
            }
        }
    }
    getCurrentLevel() {
        return this.currentLevel_;
    }
    setBackground(filepath) {
        if (filepath != null) {
            this.background_.setImage(filepath, this.horizontalArrayLength * this.step_, this.verticalArrayLength * this.step_);
        }
    }
    setForeground(filepath) {
        if (filepath != null) {
            this.foreground_.setImage(filepath, this.horizontalArrayLength * this.step_, this.verticalArrayLength * this.step_);
        }
    }
    loadMapAndInitializeLogic() {
        this.y0_ = 0;
        this.x0_ = 0;
        this.flowersToOpenPortal_ = this.rawMap_.flowersToOpenPortal_;
        this.possibleBackgrounds_ = this.rawMap_.backgroundImage_;
        this.possibleForegrounds_ = this.rawMap_.foregroundImage_;
        this.userInterface_.setFlowerBox(this.nbFlowersRecolted_, this.flowersToOpenPortal_);
        this.verticalArrayLength = this.rawMap_.rawGrid_.length;
        this.horizontalArrayLength = this.rawMap_.rawGrid_[0].length;
        this.playerLife_ = this.rawMap_.initialLifeAmount_;
        this.setBackground(this.rawMap_.backgroundImage_[0]);
        let elementZone = document.createElement("img");
        elementZone.style.zIndex = "10";
        this.dangerZone_ = new DangerZone(elementZone, this, this.rawMap_.safeAreaX_, this.rawMap_.safeAreaY_, this.rawMap_.safeAreaWidth_, this.rawMap_.safeAreaHeight_, false, this.rawMap_.safeAreaMaxHorizontalSpeed_, this.rawMap_.safeAreaAccelHorizontalSpeed_);
        this.setForeground(this.rawMap_.foregroundImage_[0]);
        this.buttons_ = [];
        for (let i = 0; i < this.rawMap_.buttons_.length; i++) {
            let elementButton = document.createElement("img");
            elementButton.style.zIndex = "79";
            this.buttons_.push(new ButtonDangerZone(elementButton, this, this.rawMap_.buttons_[i][0], this.rawMap_.buttons_[i][1], this.rawMap_.buttons_[i][2], this.rawMap_.buttons_[i][3]));
        }
        this.flowers_ = [];
        for (let i = 0; i < this.rawMap_.flowers_.length; i++) {
            let elementFlower = document.createElement("img");
            elementFlower.style.zIndex = "80";
            this.flowers_.push(new Flower(elementFlower, this, this.rawMap_.flowers_[i][0], this.rawMap_.flowers_[i][1], this.rawMap_.flowers_[i][2], this.rawMap_.flowers_[i][3], this.rawMap_.flowers_[i][4], this.rawMap_.flowers_[i][5], this.rawMap_.flowers_[i][6], this.rawMap_.flowers_[i][7]));
        }
        let elementPortal = document.createElement("img");
        elementPortal.style.zIndex = "90";
        this.portal_ = new Portal(elementPortal, this, this.rawMap_.portalCenterX_, this.rawMap_.portalCenterY_);
        let elementPlayer = document.createElement("img");
        elementPlayer.style.zIndex = "100";
        this.player_ = new Player(elementPlayer, this, this.rawMap_.playerSpawnX_, this.rawMap_.playerSpawnY_, 0.8, 0.8, "img/playerGreen.png");
        let blockImgurl = this.rawMap_.blocksImgurl_;
        for (let i = 0; i < this.verticalArrayLength; i++) {
            for (let j = 0; j < this.horizontalArrayLength; j++) {
                let typeCase = this.rawMap_.rawGrid_[i][j];
                switch (typeCase) {
                    case 0: {
                        break;
                    }
                    case 1: {
                        if (this.rawMap_.showBlocks_) {
                            let element = document.createElement("img");
                            element.style.zIndex = "30";
                            let block = new GridPositioned(element, this, j, i);
                            block.setImage(blockImgurl, this.step_, this.step_);
                            block.updateVisualPosition();
                            this.appendChild(block);
                            this.blocks_.push(block);
                        }
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
        this.sfxStorm_.pause();
        for (let i = 0; i < this.blocks_.length; i++) {
            let sprite = this.blocks_[i];
            this.removeChild(sprite);
        }
        this.blocks_ = [];
        for (let i = 0; i < this.buttons_.length; i++) {
            let sprite = this.buttons_[i];
            this.removeChild(sprite);
        }
        this.buttons_ = [];
        for (let i = 0; i < this.flowers_.length; i++) {
            let sprite = this.flowers_[i];
            this.removeChild(sprite);
        }
        this.flowers_ = [];
        this.dangerZone_.clearDangerZone();
        this.dangerZone_ = null;
        this.player_.clearPlayer();
        this.player_ = null;
        this.portal_.clearPortal();
        this.portal_ = null;
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
        this.levelLists_ = ["training_move", "training_flowers", "training_zone", "training_wall_jump", "training_good_luck", "parkour_classic", "painting_level", "painting_zone"];
        this.blocks_ = new Array;
        this.flowers_ = new Array;
        this.buttons_ = new Array;
        this.tickRate_ = 1000 / 60;
        this.step_ = 32;
    }
    start() {
        this.listenerStartGame_ = (event) => {
            document.removeEventListener("click", this.listenerStartGame_);
            this.toggleFullscreen(event);
            this.DevInputSystem();
        };
        document.addEventListener("click", this.listenerStartGame_);
    }
    pause() {
    }
    unpause() {
    }
    clean() {
    }
}
